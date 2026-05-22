import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, ChevronRight, MessageCircle, RotateCcw } from "lucide-react";
import logoImg from "../../imports/image.png";

const BACKEND_URL = "http://localhost:3001";

// ── Badan Penaja menu ─────────────────────────────────────────────────────────
interface BPEntry {
  label: string;
  full: string;
  overviewId: string;
}

const BADAN_PENAJA: BPEntry[] = [
  { label: "BKNS",      full: "Biasiswa Kerajaan Negeri Sabah",    overviewId: "bkns-overview" },
  { label: "KYS",       full: "Kumpulan Yayasan Sabah",            overviewId: "kys-overview" },
  { label: "MUIS",      full: "Majlis Ugama Islam Sabah",          overviewId: "muis-overview" },
  { label: "Baitulmal", full: "Perbadanan Baitulmal Negeri Sabah", overviewId: "baitulmal-overview" },
  { label: "TSK",       full: "Timbalan Setiausaha Kerajaan",      overviewId: "tsk-overview" },
  { label: "BUDI",      full: "Bantuan Tunai Pendaftaran IPT",     overviewId: "budi-overview" },
];

const BACK_TO_MENU = "__BACK_TO_MENU__";
const LIHAT_LAIN   = "__LIHAT_LAIN__";

const JENIS_ID_MAP: Record<string, string> = {
  bkns:      "bkns-jenis-tajaan",
  kys:       "kys-jenis-biasiswa",
  muis:      "muis-jenis-dermasiswa",
  baitulmal: "baitulmal-jenis-bantuan",
  tsk:       "tsk-jenis-tajaan",
  budi:      "budi-jenis-tajaan",
};

function getStandardChipIds(bp: typeof BADAN_PENAJA[0]): string[] {
  const p = bp.label.toLowerCase();
  return [
    `${p}-overview`,
    JENIS_ID_MAP[p] ?? `${p}-jenis-tajaan`,
    `${p}-eligibility`,
    `${p}-how-to-apply`,
    `${p}-documents`,
    `${p}-allowance`,
    `${p}-tarikh-permohonan`,
  ];
}

function getTopicChips(bp: typeof BADAN_PENAJA[0], extras: Chip[] = []): Chip[] {
  const p = bp.label.toLowerCase();
  return [
    { label: "Jenis Tajaan / Bantuan", qaId: JENIS_ID_MAP[p] },
    { label: "Kelayakan & Syarat",     qaId: `${p}-eligibility` },
    { label: "Cara Mohon",             qaId: `${p}-how-to-apply` },
    { label: "Dokumen Diperlukan",     qaId: `${p}-documents` },
    { label: "Jumlah Elaun / Nilai",   qaId: `${p}-allowance` },
    { label: "Tarikh Permohonan",      qaId: `${p}-tarikh-permohonan` },
    ...(extras.length > 0 ? [{ label: "📋 Lihat Soalan Lain", action: LIHAT_LAIN, subChips: extras }] : []),
    { label: "↩ Menu Utama",           action: BACK_TO_MENU },
  ];
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Chip {
  label: string;
  qaId?: string;        // direct Q&A entry ID — bypasses keyword matching
  action?: string;      // special client-side action
  subChips?: Chip[];    // used by "Lihat Soalan Lain" to expand extras inline
}

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  chips?: Chip[];
}

// ── Welcome message ───────────────────────────────────────────────────────────
const makeWelcomeMessage = (bpList: BPEntry[] = BADAN_PENAJA): Message => ({
  id: "welcome",
  role: "bot",
  text: "Selamat datang ke **Pusat Maklumat Tajaan YS**! 👋\n\nSaya sedia membantu anda mendapatkan maklumat mengenai tajaan dan pinjaman pendidikan di Sabah.\n\nSila pilih **Badan Penaja** di bawah:",
  timestamp: new Date(),
  chips: bpList.map((bp) => ({ label: bp.full, qaId: bp.overviewId })),
});

// ── Format markdown-style bold ────────────────────────────────────────────────
function formatText(text: string) {
  return text.split("\n").map((line, i, arr) => {
    const html = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\|(.*?)\|/g, (_, cell) => `<span class="inline-block border border-gray-200 px-2 py-0.5 text-[10px]">${cell}</span>`);
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: html }} />
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-[#1a56db] flex items-center justify-center flex-shrink-0 shadow">
        <img src={logoImg} alt="YS" className="w-5 h-5 object-contain" />
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-400"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [makeWelcomeMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeBP, setActiveBP] = useState<BPEntry | null>(null);
  const [bpList, setBpList] = useState<BPEntry[]>(BADAN_PENAJA);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/chat/categories`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((cats: { category: string; overviewId: string | null }[]) => {
        const merged: BPEntry[] = cats
          .filter((c) => c.category && c.overviewId)
          .map(({ category, overviewId }) => {
            const known = BADAN_PENAJA.find((bp) => bp.label === category);
            return known ?? { label: category, full: category, overviewId: overviewId! };
          });
        setBpList(merged);
        setMessages((prev) =>
          prev.map((m) => (m.id === "welcome" ? makeWelcomeMessage(merged) : m))
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
  }, [messages, isOpen]);

  const resetChat = () => {
    setMessages([makeWelcomeMessage(bpList)]);
    setActiveBP(null);
  };

  const handleChipClick = async (chip: Chip, sourceMessageId: string) => {
    if (isTyping) return;

    setMessages((prev) =>
      prev.map((m) => m.id === sourceMessageId ? { ...m, chips: undefined } : m)
    );

    if (chip.action === BACK_TO_MENU) {
      setActiveBP(null);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", text: "↩ Menu Utama", timestamp: new Date() },
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Baik! Sila pilih Badan Penaja yang ingin anda ketahui:",
          timestamp: new Date(),
          chips: bpList.map((bp) => ({ label: bp.full, qaId: bp.overviewId })),
        },
      ]);
      return;
    }

    if (chip.action === LIHAT_LAIN && chip.subChips) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", text: "Lihat Soalan Lain", timestamp: new Date() },
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Soalan lain yang tersedia:",
          timestamp: new Date(),
          chips: [...chip.subChips!, { label: "↩ Menu Utama", action: BACK_TO_MENU }],
        },
      ]);
      return;
    }

    if (!chip.qaId) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: chip.label, timestamp: new Date() },
    ]);
    setIsTyping(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: chip.qaId }),
      });
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();

      const matchedBP = bpList.find((bp) => bp.label === data.category) ?? null;
      if (matchedBP) setActiveBP(matchedBP);
      const currentBP = matchedBP ?? activeBP;

      let extraChips: Chip[] = [];
      if (currentBP) {
        try {
          const faqRes = await fetch(`${BACKEND_URL}/api/chat/faq/${currentBP.label}`);
          if (faqRes.ok) {
            const allEntries: { id: string; question: string }[] = await faqRes.json();
            const standardIds = new Set(getStandardChipIds(currentBP));
            extraChips = allEntries
              .filter((e) => !standardIds.has(e.id))
              .map((e) => ({ label: e.question, qaId: e.id }));
          }
        } catch { /* ignore */ }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: data.response,
          timestamp: new Date(),
          chips: currentBP
            ? getTopicChips(currentBP, extraChips)
            : bpList.map((bp) => ({ label: bp.full, qaId: bp.overviewId })),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Maaf, berlaku masalah sambungan. Sila cuba sebentar lagi.",
          timestamp: new Date(),
          chips: bpList.map((bp) => ({ label: bp.full, qaId: bp.overviewId })),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* ── Chat panel ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className="w-[min(390px,calc(100vw-1.5rem))] h-[min(600px,calc(100vh-6rem))] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ background: "#f8fafc" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                <img src={logoImg} alt="YS" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm leading-tight">Pusat Maklumat Tajaan YS</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-blue-100 text-[11px]">Dalam talian</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={resetChat}
                  title="Mulakan semula"
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1" style={{ background: "#f1f5f9" }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 mb-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                      msg.role === "bot" ? "bg-[#1a56db]" : "bg-slate-500"
                    }`}>
                      {msg.role === "bot"
                        ? <img src={logoImg} alt="YS" className="w-5 h-5 object-contain" />
                        : <User className="w-3.5 h-3.5 text-white" />}
                    </div>

                    <div className={`flex flex-col gap-1.5 max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      {/* Bubble */}
                      <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                        msg.role === "bot"
                          ? "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                          : "text-white rounded-br-none"
                      }`}
                        style={msg.role === "user" ? { background: "linear-gradient(135deg, #1a56db, #1e3a8a)" } : {}}
                      >
                        <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
                      </div>

                      {/* Timestamp */}
                      <span className="text-gray-400 text-[10px] px-1">
                        {msg.timestamp.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
                      </span>

                      {/* Chips */}
                      {msg.chips && msg.role === "bot" && (
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {msg.chips.map((chip) => (
                            <button
                              key={chip.label}
                              onClick={() => handleChipClick(chip, msg.id)}
                              disabled={isTyping}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 text-blue-700 text-[10px] font-medium transition-all active:scale-95 disabled:opacity-40 shadow-sm"
                            >
                              {chip.label}
                              <ChevronRight className="w-2.5 h-2.5 opacity-60" />
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

            {/* Footer */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex-shrink-0">
              <p className="text-center text-gray-400 text-[10px]">
                Semak portal rasmi untuk maklumat dan tarikh terkini.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button ────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg border-2 border-white/40 relative"
        style={{ background: "linear-gradient(135deg, #1a56db, #1e3a8a)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
