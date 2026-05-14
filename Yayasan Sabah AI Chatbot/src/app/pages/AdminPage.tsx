import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Trash2, CheckCircle, XCircle, Loader2, ArrowLeft, Database, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

const BACKEND_URL = "http://localhost:3001";

interface UploadResult {
  filename: string;
  status: "success" | "error";
  chunks?: number;
  error?: string;
}

interface Document {
  metadata: { filename: string };
  created_at: string;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoadingDocs(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/upload/documents`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      console.error("Failed to load documents");
    } finally {
      setLoadingDocs(false);
    }
  };

  const uploadFiles = async (files: FileList) => {
    if (!files.length) return;
    setUploading(true);
    setResults([]);

    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));

    try {
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data.results || []);
      loadDocuments();
    } catch {
      setResults([{ filename: "Muat naik gagal", status: "error", error: "Tidak dapat menyambung ke pelayan. Sila semak sambungan anda." }]);
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (filename: string) => {
    setDeletingFile(filename);
    try {
      await fetch(`${BACKEND_URL}/api/upload/documents/${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      loadDocuments();
    } catch {
      console.error("Failed to delete document");
    } finally {
      setDeletingFile(null);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  }, []);

  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a08 50%, #0a1628 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Panel Pentadbir</h1>
            <p className="text-white/40 text-sm mt-0.5">Urus pangkalan pengetahuan chatbot</p>
          </div>
          {documents.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a56db]/15 border border-[#1a56db]/25 rounded-lg">
              <Database className="w-3.5 h-3.5 text-[#1a56db]" />
              <span className="text-[#1a56db] text-sm font-medium">{documents.length} dokumen</span>
            </div>
          )}
        </motion.div>

        {/* Upload zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`border-2 border-dashed rounded-2xl p-12 text-center mb-6 transition-all cursor-pointer ${
            isDragging
              ? "border-[#1a56db] bg-[#1a56db]/10 scale-[1.01]"
              : "border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.05]"
          }`}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a56db]/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#1a56db] animate-spin" />
              </div>
              <div>
                <p className="text-white text-lg font-semibold">Memproses dokumen...</p>
                <p className="text-white/40 text-sm mt-1">
                  Mengekstrak teks, menjana embeddings dan menyimpan ke pangkalan data
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isDragging ? "bg-[#1a56db]/20" : "bg-white/5"}`}>
                <Upload className={`w-7 h-7 transition-colors ${isDragging ? "text-[#1a56db]" : "text-white/30"}`} />
              </div>
              <div>
                <p className="text-white text-lg font-semibold">
                  {isDragging ? "Lepaskan fail di sini" : "Seret & lepas fail PDF ke sini"}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  atau klik untuk memilih fail &nbsp;·&nbsp; Boleh muat naik banyak fail serentak
                </p>
              </div>
              <button
                className="mt-1 px-5 py-2 bg-[#1a56db] hover:bg-[#1a56db]/80 rounded-full text-white text-sm font-medium transition-colors"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Pilih PDF
              </button>
            </div>
          )}
        </motion.div>

        {/* Upload results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Keputusan Muat Naik</h3>
                <div className="flex items-center gap-3 text-sm">
                  {successCount > 0 && (
                    <span className="text-green-400 font-medium">{successCount} berjaya</span>
                  )}
                  {errorCount > 0 && (
                    <span className="text-red-400 font-medium">{errorCount} gagal</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      r.status === "success"
                        ? "bg-green-500/8 border-green-500/20"
                        : "bg-red-500/8 border-red-500/20"
                    }`}
                  >
                    {r.status === "success"
                      ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{r.filename}</p>
                      {r.status === "success"
                        ? <p className="text-green-400 text-xs mt-0.5">{r.chunks} bahagian teks berjaya disimpan</p>
                        : <p className="text-red-400 text-xs mt-0.5">{r.error}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Document list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Dokumen Tersimpan</h3>
            <button
              onClick={loadDocuments}
              disabled={loadingDocs}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingDocs ? "animate-spin" : ""}`} />
              Muat semula
            </button>
          </div>

          {loadingDocs && documents.length === 0 ? (
            <div className="flex items-center justify-center py-14 text-white/30">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-sm">Memuatkan dokumen...</span>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-14 border border-dashed border-white/10 rounded-2xl">
              <FileText className="w-10 h-10 mx-auto mb-3 text-white/20" />
              <p className="text-white/40 text-sm font-medium">Tiada dokumen lagi</p>
              <p className="text-white/25 text-xs mt-1">Muat naik fail PDF di atas untuk memulakan</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex items-center gap-3 p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-white/15 rounded-xl transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1a56db]/15 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#1a56db]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{doc.metadata?.filename}</p>
                    <p className="text-white/35 text-xs mt-0.5">
                      Dimuat naik pada {new Date(doc.created_at).toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteDocument(doc.metadata?.filename)}
                    disabled={deletingFile === doc.metadata?.filename}
                    className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                    title="Padam dokumen"
                  >
                    {deletingFile === doc.metadata?.filename
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
