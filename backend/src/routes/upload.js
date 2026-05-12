import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { extractTextFromPDF, chunkText } from "../services/pdf.js";
import { generateEmbedding } from "../services/gemini.js";
import { storeChunk, deleteDocumentByFile, listDocuments } from "../services/supabase.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// Upload and process single or multiple PDFs
router.post("/", upload.array("files", 20), async (req, res) => {
  const files = req.files;
  if (!files?.length) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const results = [];

  for (const file of files) {
    try {
      // Extract text
      const text = await extractTextFromPDF(file.path);

      // Chunk text
      const chunks = chunkText(text, 500, 50);

      // Embed and store each chunk
      let stored = 0;
      for (const chunk of chunks) {
        const embedding = await generateEmbedding(chunk);
        await storeChunk(chunk, { filename: file.originalname, path: file.path }, embedding);
        stored++;
      }

      // Clean up uploaded file
      fs.unlinkSync(file.path);

      results.push({
        filename: file.originalname,
        chunks: stored,
        status: "success",
      });
    } catch (err) {
      console.error(`Error processing ${file.originalname}:`, err);
      results.push({
        filename: file.originalname,
        status: "error",
        error: err.message,
      });
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }
  }

  res.json({ results });
});

// List all uploaded documents
router.get("/documents", async (req, res) => {
  try {
    const docs = await listDocuments();
    res.json({ documents: docs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a document by filename
router.delete("/documents/:filename", async (req, res) => {
  try {
    await deleteDocumentByFile(decodeURIComponent(req.params.filename));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
