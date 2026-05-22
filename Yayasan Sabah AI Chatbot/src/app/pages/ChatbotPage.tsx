import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, User, ChevronRight } from "lucide-react";
import logoImg from "../../imports/image.png";

const BACKEND_URL = "http://localhost:3001";

// ── Badan Penaja ──────────────────────────────────────────────────────────────
interface BPEntry {
  label: string;
  full: string;
  keywords: string[];
  query: string;
  overviewId?: string;
}

const BADAN_PENAJA: BPEntry[] = [
  { label: "BKNS",      full: "Biasiswa Kerajaan Negeri Sabah",       keywords: ["bkns", "biasiswa kerajaan negeri"],         query: "Terangkan mengenai Biasiswa Kerajaan Negeri Sabah (BKNS) — jenis tajaan, kelayakan umum dan cara permohonan." },
  { label: "KYS",       full: "Kumpulan Yayasan Sabah",               keywords: ["kys", "kumpulan yayasan", "yayasan sabah"], query: "Terangkan mengenai Biasiswa Kumpulan Yayasan Sabah (KYS) — jenis tajaan, kelayakan umum dan cara permohonan." },
  { label: "MUIS",      full: "Majlis Ugama Islam Sabah",              keywords: ["muis", "dermasiswa", "ugama islam sabah"],  query: "Terangkan mengenai Dermasiswa Majlis Ugama Islam Sabah (MUIS) — jenis tajaan, kelayakan umum dan cara permohonan." },
  { label: "Baitulmal", full: "Perbadanan Baitulmal Negeri Sabah",     keywords: ["baitulmal"],                                query: "Terangkan mengenai Biasiswa Perbadanan Baitulmal Negeri Sabah — jenis tajaan, kelayakan umum dan cara permohonan." },
  { label: "TSK",       full: "Timbalan Setiausaha Kerajaan",          keywords: ["tsk", "timbalan setiausaha"],               query: "Terangkan mengenai Tajaan Timbalan Setiausaha Kerajaan Negeri Sabah (TSK) — jenis tajaan, kelayakan umum dan cara permohonan." },
  { label: "BUDI",      full: "Bantuan Tunai Pendaftaran IPT",         keywords: ["budi", "bantuan tunai", "pendaftaran ipt"], query: "Terangkan mengenai BUDI — Bantuan Tunai Pendaftaran IPT, termasuk kelayakan dan cara permohonan." },
];

function detectBPFromText(text: string, bpList: BPEntry[]): BPEntry | null {
  const lower = text.toLowerCase();
  for (const bp of bpList) {
    const terms = [bp.full, bp.label, ...bp.keywords];
    if (terms.some((t) => lower.includes(t.toLowerCase()))) return bp;
  }
  return null;
}

const PILIH_PENAJA_LAIN = "__PILIH_PENAJA_LAIN__";
const LIHAT_LAIN        = "__LIHAT_LAIN__";
const KEMBALI_TOPIK     = "__KEMBALI_TOPIK__";

const JENIS_ID_MAP: Record<string, string> = {
  bkns:      "bkns-jenis-tajaan",
  kys:       "kys-jenis-biasiswa",
  muis:      "muis-jenis-dermasiswa",
  baitulmal: "baitulmal-jenis-bantuan",
  tsk:       "tsk-jenis-tajaan",
  budi:      "budi-jenis-tajaan",
};

function getStandardChipIds(bp: BPEntry): string[] {
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

// Topic chips shown after a Badan Penaja is selected
function getTopicChips(bp: BPEntry, extras: QuickReply[] = []): QuickReply[] {
  const p = bp.label.toLowerCase();
  return [
    { label: "Jenis Tajaan / Bantuan", id: JENIS_ID_MAP[p],           query: `Apakah jenis-jenis tajaan atau bantuan untuk ${bp.full}?` },
    { label: "Kelayakan & Syarat",     id: `${p}-eligibility`,        query: `Apakah kelayakan dan syarat untuk ${bp.full}?` },
    { label: "Cara Mohon",             id: `${p}-how-to-apply`,       query: `Bagaimana cara memohon ${bp.full}? Terangkan langkah-langkah permohonan.` },
    { label: "Dokumen Diperlukan",     id: `${p}-documents`,          query: `Apakah dokumen yang diperlukan untuk memohon ${bp.full}?` },
    { label: "Jumlah Elaun / Nilai",   id: `${p}-allowance`,          query: `Berapakah jumlah elaun atau nilai tajaan ${bp.full}?` },
    { label: "Tarikh Permohonan",      id: `${p}-tarikh-permohonan`,  query: `Bilakah tarikh permohonan ${bp.full} dibuka dan ditutup?` },
    ...(extras.length > 0 ? [{ label: "📋 Lihat Soalan Lain", query: LIHAT_LAIN, subChips: extras }] : []),
    { label: "↩ Pilih Penaja Lain",                                    query: PILIH_PENAJA_LAIN },
  ];
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface QuickReply {
  label: string;
  query: string;
  id?: string;
  subChips?: QuickReply[];  // used by "Lihat Soalan Lain" to expand extras inline
}

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

// ── Welcome message ───────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  text: "Selamat datang ke YS Chatbot! 👋\n\nSaya pembantu untuk maklumat tajaan dan pinjaman pendidikan di Sabah.\n\nSila pilih **Badan Penaja** yang ingin anda ketahui:",
  timestamp: new Date(),
  quickReplies: BADAN_PENAJA.map((bp) => ({
    label: bp.full,
    query: bp.query,
    id: `${bp.label.toLowerCase()}-overview`,
  })),
};

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
        <img src={logoImg} alt="YS" className="w-full h-full object-contain" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{ y: [-3, 3, -3] }}
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

// ── Main component ────────────────────────────────────────────────────────────
export default function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([]);
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
          .filter((c) => c.category)
          .map(({ category, overviewId }) => {
            const known = BADAN_PENAJA.find((bp) => bp.label === category);
            if (known) return { ...known, overviewId: overviewId ?? `${known.label.toLowerCase()}-overview` };
            return {
              label: category,
              full: category,
              keywords: [category.toLowerCase()],
              query: `Terangkan mengenai ${category} — jenis tajaan, kelayakan umum dan cara permohonan.`,
              overviewId: overviewId ?? undefined,
            };
          });
        setBpList(merged);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === "welcome"
              ? {
                  ...m,
                  quickReplies: merged.map((bp) => ({
                    label: bp.full,
                    query: bp.query,
                    id: bp.overviewId,
                  })),
                }
              : m
          )
        );
      })
      .catch(() => {});
  }, []);

  const sendMessage = async (text: string, qaId?: string) => {
    if (!text.trim() || isTyping) return;

    // Handle "Pilih Penaja Lain" client-side — no backend call needed
    if (text === PILIH_PENAJA_LAIN) {
      const otherBPs = bpList.filter((bp) => bp.label !== activeBP?.label);
      setActiveBP(null);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", text: "Pilih Penaja Lain", timestamp: new Date() },
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: "Baik! Sila pilih Badan Penaja lain yang ingin anda ketahui:",
          timestamp: new Date(),
          quickReplies: otherBPs.map((bp) => ({ label: bp.full, query: bp.query, id: bp.overviewId })),
        },
      ]);
      return;
    }

    const matchedBP = bpList.find((bp) => bp.query === text);
    const currentBP = matchedBP ?? detectBPFromText(text, bpList);
    if (currentBP) setActiveBP(currentBP);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: matchedBP ? matchedBP.full : text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(scrollToBottom, 50);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history: chatHistory, ...(qaId && { id: qaId }) }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();

      // Resolve effective BP: text-match first, then API category, then last-known activeBP
      const bpFromCategory = bpList.find((bp) => bp.label === data.category) ?? null;
      const effectiveBP = currentBP ?? bpFromCategory ?? activeBP;
      if (bpFromCategory && !currentBP) setActiveBP(bpFromCategory);

      let extraChips: QuickReply[] = [];
      if (effectiveBP) {
        try {
          const faqRes = await fetch(`${BACKEND_URL}/api/chat/faq/${effectiveBP.label}`);
          if (faqRes.ok) {
            const allEntries: { id: string; question: string }[] = await faqRes.json();
            const standardIds = new Set(getStandardChipIds(effectiveBP));
            extraChips = allEntries
              .filter((e) => !standardIds.has(e.id))
              .map((e) => ({ label: e.question, id: e.id, query: e.question }));
          }
        } catch { /* ignore */ }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: data.response,
        timestamp: new Date(),
        quickReplies: effectiveBP ? getTopicChips(effectiveBP, extraChips) : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: text.trim() },
        { role: "assistant", content: data.response },
      ]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: "Maaf, berlaku masalah sambungan. Sila pastikan pelayan berjalan dan cuba semula.",
        timestamp: new Date(),
        quickReplies: bpList.map((bp) => ({ label: bp.full, query: bp.query, id: bp.overviewId })),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a08 50%, #0a1628 100%)" }}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1a56db, transparent)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0066cc, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-4 px-4 md:px-8 py-4 backdrop-blur-xl bg-black/30 border-b border-white/10"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm hidden sm:block">Kembali</span>
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-[#1a56db]/30 blur-lg rounded-full" />
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain relative z-10" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">YS CHATBOT</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Online</span>
            </div>
          </div>
        </div>

      </motion.header>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-1">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-3 mb-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "bot"
                    ? "bg-gradient-to-br from-[#1a56db] to-[#1e3a8a]"
                    : "bg-gradient-to-br from-blue-500 to-blue-700"
                }`}
              >
                {msg.role === "bot" ? (
                  <img src={logoImg} alt="YS" className="w-full h-full object-contain p-1" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`flex flex-col gap-2 max-w-[82%] md:max-w-[65%] ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white/10 backdrop-blur-sm border border-white/10 rounded-bl-none text-white"
                      : "bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] rounded-br-none text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
                </div>

                {/* Timestamp */}
                <span className="text-white/30 text-xs px-1">
                  {msg.timestamp.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
                </span>

                {/* Quick reply chips */}
                {msg.quickReplies && msg.role === "bot" && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((m) => m.id === msg.id ? { ...m, quickReplies: undefined } : m)
                          );
                          if (qr.query === LIHAT_LAIN && qr.subChips) {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: Date.now().toString(),
                                role: "bot" as const,
                                text: "Soalan lain yang tersedia:",
                                timestamp: new Date(),
                                quickReplies: [
                                  ...qr.subChips!,
                                  { label: "↩ Kembali", query: KEMBALI_TOPIK, subChips: qr.subChips },
                                ],
                              },
                            ]);
                          } else if (qr.query === KEMBALI_TOPIK) {
                            const extras = qr.subChips ?? [];
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: Date.now().toString(),
                                role: "bot" as const,
                                text: "Pilihan topik:",
                                timestamp: new Date(),
                                quickReplies: activeBP
                                  ? getTopicChips(activeBP, extras)
                                  : [{ label: "↩ Pilih Penaja Lain", query: PILIH_PENAJA_LAIN }],
                              },
                            ]);
                          } else {
                            sendMessage(qr.query, qr.id);
                          }
                        }}
                        disabled={isTyping}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#1a56db]/25 border border-white/20 hover:border-[#1a56db]/50 text-white text-xs font-medium transition-all active:scale-95 disabled:opacity-40"
                      >
                        {qr.label}
                        <ChevronRight className="w-3 h-3 opacity-50" />
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
      <div className="relative z-10 px-4 md:px-8 py-3 backdrop-blur-xl bg-black/30 border-t border-white/10">
        <p className="text-center text-white/25 text-xs">
          Maklumat untuk panduan sahaja. Sila semak portal rasmi untuk maklumat terkini.
        </p>
      </div>
    </div>
  );
}
