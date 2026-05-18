import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Trash2, Pencil, X, Check, ArrowLeft,
  MessageSquare, Loader2, RefreshCw, ChevronDown, ChevronUp,
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
  allIds,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<QAEntry, "id"> & { id?: string };
  allIds: { id: string; question: string }[];
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

      {/* Follow-ups */}
      <div>
        <label className="block text-white/50 text-xs mb-1.5">ID Soalan Susulan</label>
        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {allIds
            .filter((e) => e.id !== (initial as QAEntry).id)
            .map((e) => (
              <label key={e.id} className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.followUps.includes(e.id)}
                  onChange={(ev) =>
                    set(
                      "followUps",
                      ev.target.checked
                        ? [...form.followUps, e.id]
                        : form.followUps.filter((x) => x !== e.id)
                    )
                  }
                  className="mt-0.5 accent-[#1a56db]"
                />
                <span className="text-white/50 text-xs group-hover:text-white/70 transition-colors line-clamp-1">
                  {e.question}
                </span>
              </label>
            ))}
        </div>
      </div>

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

  useEffect(() => { load(); }, []);

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
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`${BACKEND_URL}/api/admin/qa/${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (expandedId === id) setExpandedId(null);
    } finally {
      setDeletingId(null);
    }
  };

  const allIds = entries.map((e) => ({ id: e.id, question: e.question }));
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
              onClick={load}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white/70 text-sm transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </motion.div>

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
                  allIds={allIds}
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
                      allIds={allIds}
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
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}
                          disabled={deletingId === entry.id}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                          title="Padam"
                        >
                          {deletingId === entry.id
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
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
