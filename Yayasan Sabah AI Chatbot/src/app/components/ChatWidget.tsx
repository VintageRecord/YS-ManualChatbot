import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, User, ChevronRight, MessageCircle } from "lucide-react";
import logoImg from "../../imports/image.png";

const BACKEND_URL = "http://localhost:3001";

// ── Badan Penaja menu buttons ─────────────────────────────────────────────────
const BADAN_PENAJA = [
  { label: "BKNS",      full: "Biasiswa Kerajaan Negeri Sabah",      query: "Apakah itu BKNS?" },
  { label: "KYS",       full: "Kumpulan Yayasan Sabah",              query: "Apakah itu KYS?" },
  { label: "MUIS",      full: "Majlis Ugama Islam Sabah",            query: "Apakah itu MUIS?" },
  { label: "Baitulmal", full: "Perbadanan Baitulmal Negeri Sabah",   query: "Apakah itu Biasiswa Baitulmal?" },
  { label: "TSK",       full: "Timbalan Setiausaha Kerajaan",        query: "Apakah itu TSK?" },
  { label: "BUDI",      full: "Bantuan Tunai Pendaftaran IPT",       query: "Apakah itu BUDI?" },
];

const BACK_TO_MENU = "__BACK_TO_MENU__";

// ── Types ─────────────────────────────────────────────────────────────────────
interface QuickReply {
  label: string;
  query: string;
}

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

// ── Welcome message ───────────────────────────────────────────────────────────
const makeWelcomeMessage = (): Message => ({
  id: "welcome",
  role: "bot",
  text: "Selamat datang ke YS Chatbot! 👋\n\nSaya pembantu untuk maklumat tajaan dan pinjaman pendidikan di Sabah.\n\nSila pilih **Badan Penaja** yang ingin anda ketahui:",
  timestamp: new Date(),
  quickReplies: BADAN_PENAJA.map((bp) => ({ label: bp.full, query: bp.query })),
});

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] flex items-center justify-center flex-shrink-0 p-1">
        <img src={logoImg} alt="YS" className="w-full h-full object-contain" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-3 py-2">
        <div className="flex gap-1 items-center h-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function formatText(text: string) {
  return text.split("\n").map((line, i, arr) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: bold }} />
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

// ── Main widget component ─────────────────────────────────────────────────────
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [makeWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Handle "Back to menu" client-side
    if (text === BACK_TO_MENU) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", text: "↩ Menu Utama", timestamp: new Date() },
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Baik! Sila pilih Badan Penaja yang ingin anda ketahui:",
          timestamp: new Date(),
          quickReplies: BADAN_PENAJA.map((bp) => ({ label: bp.full, query: bp.query })),
        },
      ]);
      return;
    }

    // Find if this is a Badan Penaja button click (display short label)
    const bpMatch = BADAN_PENAJA.find((bp) => bp.query === text);
    const displayText = bpMatch ? bpMatch.full : text.trim();

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: displayText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(scrollToBottom, 50);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();

      // Build quick reply chips from follow-ups + back-to-menu
      const followUpChips: QuickReply[] = (data.followUps || []).map(
        (fu: { label: string; id: string }) => ({
          label: fu.label,
          query: fu.label,
        })
      );
      const chips: QuickReply[] = [
        ...followUpChips,
        { label: "↩ Menu Utama", query: BACK_TO_MENU },
      ];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: data.response,
        timestamp: new Date(),
        quickReplies: chips,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Maaf, berlaku masalah sambungan. Sila pastikan pelayan berjalan dan cuba semula.",
          timestamp: new Date(),
          quickReplies: BADAN_PENAJA.map((bp) => ({ label: bp.full, query: bp.query })),
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(scrollToBottom, 150);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="w-[min(380px,calc(100vw-2rem))] h-[min(580px,calc(100vh-7rem))] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            style={{ background: "linear-gradient(160deg, #0a1628 0%, #1a0a08 60%, #0a1628 100%)" }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border-b border-white/10 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1a56db]/30 blur-md rounded-full" />
                <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain relative z-10" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">YS CHATBOT</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-end gap-2 mb-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "bot"
                          ? "bg-gradient-to-br from-[#1a56db] to-[#1e3a8a]"
                          : "bg-gradient-to-br from-blue-500 to-blue-700"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <img src={logoImg} alt="YS" className="w-full h-full object-contain p-0.5" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    <div
                      className={`flex flex-col gap-1.5 max-w-[80%] ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Bubble */}
                      <div
                        className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                          msg.role === "bot"
                            ? "bg-white/10 backdrop-blur-sm border border-white/10 rounded-bl-none text-white"
                            : "bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] rounded-br-none text-white"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
                      </div>

                      {/* Timestamp */}
                      <span className="text-white/30 text-[10px] px-1">
                        {msg.timestamp.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
                      </span>

                      {/* Quick reply chips */}
                      {msg.quickReplies && msg.role === "bot" && (
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {msg.quickReplies.map((qr) => (
                            <button
                              key={qr.label}
                              onClick={() => sendMessage(qr.query)}
                              disabled={isTyping}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#1a56db]/25 border border-white/20 hover:border-[#1a56db]/50 text-white text-[10px] font-medium transition-all active:scale-95 disabled:opacity-40"
                            >
                              {qr.label}
                              <ChevronRight className="w-2.5 h-2.5 opacity-50" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-black/30 border-t border-white/10 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Taip soalan anda..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-center text-white/20 text-[10px] mt-1.5">
                Semak portal rasmi untuk maklumat terkini.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] text-white flex items-center justify-center shadow-lg shadow-[#1a56db]/40 border border-white/20 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#1a56db]/60 animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
