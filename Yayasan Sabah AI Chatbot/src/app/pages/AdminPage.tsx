import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Trash2, Pencil, X, Check, ArrowLeft,
  MessageSquare, Loader2, RefreshCw, ChevronDown, ChevronUp, Clock,
} from "lucide-react";
import { useNavigate } from "react-router";

const BACKEND_URL = "http://localhost:3001";

const CATEGORIES = ["BKNS", "KYS", "MUIS", "Baitulmal", "TSK", "BUDI", "Umum"];

interface QAEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  followUps: string[];
}

interface LogEntry {
  id: string;
  timestamp: string;
  action: "create" | "edit" | "delete";
  entryId: string;
  question: string;
  category: string;
}

const emptyForm = (): Omit<QAEntry, "id"> => ({
  category: "BKNS",
  question: "",
  answer: "",
  keywords: [],
  followUps: [],
});

// ── Keyword tag input ─────────────────────────────────────────────────────────
function TagInput({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (t: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim().toLowerCase();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setDraft("");
  };

  return (
    <div>
      <label className="block text-white/50 text-xs mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1a56db]/20 border border-[#1a56db]/30 text-[#6b9cf7] text-xs"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(tags.filter((x) => x !== t))}
              className="hover:text-red-400 transition-colors"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Taip dan tekan Enter..."
          className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-white/60 text-xs transition-all"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}

// ── Form modal ────────────────────────────────────────────────────────────────
function QAForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<QAEntry, "id"> & { id?: string };
  onSave: (data: Omit<QAEntry, "id">) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Omit<QAEntry, "id">>({
    category: initial.category,
    question: initial.question,
    answer: initial.answer,
    keywords: [...initial.keywords],
    followUps: [...initial.followUps],
  });

  const set = (k: keyof typeof form, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      className="space-y-4"
    >
      {/* Category */}
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Kategori</label>
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0a1628]">{c}</option>
          ))}
        </select>
      </div>

      {/* Question */}
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Soalan</label>
        <input
          required
          type="text"
          value={form.question}
          onChange={(e) => set("question", e.target.value)}
          placeholder="Contoh: Apakah kelayakan untuk BKNS?"
          className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Answer */}
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Jawapan</label>
        <textarea
          required
          rows={5}
          value={form.answer}
          onChange={(e) => set("answer", e.target.value)}
          placeholder="Tulis jawapan lengkap di sini. Gunakan **teks** untuk huruf tebal."
          className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
        />
      </div>

      {/* Keywords */}
      <TagInput
        label="Kata kunci (untuk carian teks)"
        tags={form.keywords}
        onChange={(t) => set("keywords", t)}
      />

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a56db] hover:bg-[#1a56db]/80 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          Simpan
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-sm transition-all"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<QAEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCat, setFilterCat] = useState("Semua");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [showLog, setShowLog] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/qa`);
      setEntries(await res.json());
    } catch {
      console.error("Failed to load Q&A");
    } finally {
      setLoading(false);
    }
  };

  const loadLog = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/log`);
      if (res.ok) setLog(await res.json());
    } catch (e) {
      console.error("Log fetch failed:", e);
    }
  };

  useEffect(() => { load(); loadLog(); }, []);

  const createEntry = async (data: Omit<QAEntry, "id">) => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setEntries((prev) => [...prev, created]);
      setShowAddForm(false);
      loadLog();
    } finally {
      setSaving(false);
    }
  };

  const updateEntry = async (id: string, data: Omit<QAEntry, "id">) => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/qa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)));
      setEditingId(null);
      loadLog();
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      await fetch(`${BACKEND_URL}/api/admin/qa/${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (expandedId === id) setExpandedId(null);
      loadLog();
    } finally {
      setDeletingId(null);
    }
  };

  const cats = ["Semua", ...CATEGORIES];
  const filtered = filterCat === "Semua" ? entries : entries.filter((e) => e.category === filterCat);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a08 50%, #0a1628 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Panel Pentadbir</h1>
            <p className="text-white/40 text-sm mt-0.5">Urus soal-jawab chatbot</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a56db]/15 border border-[#1a56db]/25 rounded-lg">
              <MessageSquare className="w-3.5 h-3.5 text-[#1a56db]" />
              <span className="text-[#1a56db] text-sm font-medium">{entries.length} entri</span>
            </div>
            <button
              onClick={() => setShowLog((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                showLog
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "bg-white/5 border border-white/10 text-white/40 hover:text-white/70"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sejarah</span>
            </button>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white/70 text-sm transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </motion.div>

        {/* Log history panel */}
        <AnimatePresence>
          {showLog && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-6"
            >
              <div className="bg-white/[0.03] border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="text-white font-semibold text-sm">Sejarah Tindakan</h3>
                  <span className="ml-auto text-white/30 text-xs">{log.length} rekod</span>
                </div>
                {log.length === 0 ? (
                  <p className="text-white/30 text-xs text-center py-4">Tiada rekod lagi</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {log.map((entry) => {
                      const actionMap = {
                        create: { label: "Tambah",     cls: "bg-green-500/15 border-green-500/30 text-green-400" },
                        edit:   { label: "Kemaskini",  cls: "bg-blue-500/15 border-blue-500/30 text-blue-400" },
                        delete: { label: "Padam",      cls: "bg-red-500/15 border-red-500/30 text-red-400" },
                      };
                      const { label, cls } = actionMap[entry.action];
                      const dt = new Date(entry.timestamp);
                      const dateStr = dt.toLocaleDateString("ms-MY", { day: "2-digit", month: "short", year: "numeric" });
                      const timeStr = dt.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" });
                      return (
                        <div key={entry.id} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-medium ${cls}`}>
                            {label}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/70 text-xs truncate">{entry.question}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">{entry.category} · {entry.entryId}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-white/30 text-[10px]">{dateStr}</p>
                            <p className="text-white/20 text-[10px]">{timeStr}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add new button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <AnimatePresence>
            {showAddForm ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-white font-semibold mb-4">Tambah Entri Baharu</h3>
                <QAForm
                  initial={emptyForm()}
                  onSave={createEntry}
                  onCancel={() => setShowAddForm(false)}
                  saving={saving}
                />
              </motion.div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1a56db] hover:bg-[#1a56db]/80 rounded-xl text-white text-sm font-medium transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Tambah Soal-Jawab Baharu
              </button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filterCat === c
                  ? "bg-[#1a56db] text-white"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Entry list */}
        {loading && entries.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-white/30">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Memuatkan entri...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-white/20" />
            <p className="text-white/40 text-sm font-medium">Tiada entri dalam kategori ini</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/8 hover:border-white/15 rounded-xl transition-all overflow-hidden"
              >
                {editingId === entry.id ? (
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-4">Edit Entri</h3>
                    <QAForm
                      initial={entry}
                      onSave={(data) => updateEntry(entry.id, data)}
                      onCancel={() => setEditingId(null)}
                      saving={saving}
                    />
                  </div>
                ) : (
                  <>
                    {/* Row header */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    >
                      <span className="px-2 py-0.5 rounded-full bg-[#1a56db]/15 border border-[#1a56db]/25 text-[#6b9cf7] text-[10px] font-medium flex-shrink-0">
                        {entry.category}
                      </span>
                      <p className="flex-1 text-white text-sm font-medium truncate">
                        {entry.question}
                      </p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingId(entry.id); setExpandedId(null); }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {confirmDeleteId === entry.id ? (
                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <span className="text-white/40 text-xs">Padam?</span>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="px-2 py-0.5 rounded bg-red-500/20 hover:bg-red-500/35 border border-red-500/40 text-red-400 text-xs transition-all"
                            >
                              Ya
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 text-xs transition-all"
                            >
                              Tidak
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(entry.id); setExpandedId(null); }}
                            disabled={deletingId === entry.id}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                            title="Padam"
                          >
                            {deletingId === entry.id
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        )}
                        {expandedId === entry.id
                          ? <ChevronUp className="w-3.5 h-3.5 text-white/30" />
                          : <ChevronDown className="w-3.5 h-3.5 text-white/30" />}
                      </div>
                    </div>

                    {/* Expanded answer */}
                    <AnimatePresence>
                      {expandedId === entry.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-white/8 pt-3 space-y-3">
                            <p className="text-white/60 text-xs whitespace-pre-wrap leading-relaxed">
                              {entry.answer}
                            </p>
                            {entry.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {entry.keywords.map((kw) => (
                                  <span key={kw} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px]">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
