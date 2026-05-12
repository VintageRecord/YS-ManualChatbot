import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Trash2, CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setResults([{ filename: "Upload failed", status: "error", error: "Cannot connect to backend" }]);
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (filename: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/upload/documents/${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      loadDocuments();
    } catch {
      console.error("Failed to delete document");
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a08 50%, #0a1628 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate("/")} className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/50 text-sm mt-1">Urus dokumen pengetahuan chatbot</p>
          </div>
        </div>

        {/* Upload zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-2xl p-12 text-center mb-8 transition-all cursor-pointer ${
            isDragging
              ? "border-[#1a56db] bg-[#1a56db]/10"
              : "border-white/20 hover:border-white/40 bg-white/5"
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
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
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-[#1a56db] animate-spin" />
              <p className="text-white text-lg">Memproses dokumen...</p>
              <p className="text-white/50 text-sm">Mengekstrak teks, mencipta embeddings, menyimpan ke pangkalan data</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-12 h-12 text-white/40" />
              <p className="text-white text-lg font-medium">Seret & lepas fail PDF di sini</p>
              <p className="text-white/50 text-sm">atau klik untuk pilih fail • Boleh muat naik banyak fail sekaligus</p>
              <div className="mt-2 px-4 py-2 bg-[#1a56db] rounded-full text-white text-sm font-medium">
                Pilih PDF
              </div>
            </div>
          )}
        </motion.div>

        {/* Upload results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 space-y-2"
            >
              <h3 className="text-white font-semibold mb-3">Keputusan Muat Naik</h3>
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-xl ${r.status === "success" ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                  {r.status === "success"
                    ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{r.filename}</p>
                    {r.status === "success"
                      ? <p className="text-green-400 text-xs">{r.chunks} bahagian disimpan berjaya</p>
                      : <p className="text-red-400 text-xs">{r.error}</p>}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Document list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Dokumen Tersimpan</h3>
            <button
              onClick={loadDocuments}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {loadingDocs ? "Memuatkan..." : "Muat semula"}
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-10 text-white/30">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>Tiada dokumen lagi. Muat naik PDF anda di atas.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <FileText className="w-5 h-5 text-[#1a56db] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{doc.metadata?.filename}</p>
                    <p className="text-white/40 text-xs">{new Date(doc.created_at).toLocaleDateString("ms-MY")}</p>
                  </div>
                  <button
                    onClick={() => deleteDocument(doc.metadata?.filename)}
                    className="text-white/30 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
