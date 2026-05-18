import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QA_PATH = path.join(__dirname, "../data/qa.json");

const router = express.Router();

function loadQA() {
  return JSON.parse(readFileSync(QA_PATH, "utf-8"));
}

function saveQA(data) {
  writeFileSync(QA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/admin/qa — list all entries
router.get("/qa", (req, res) => {
  res.json(loadQA());
});

// POST /api/admin/qa — create new entry
router.post("/qa", (req, res) => {
  const { category, question, answer, keywords, followUps } = req.body;
  if (!category || !question || !answer) {
    return res.status(400).json({ error: "category, question, and answer are required" });
  }

  const qa = loadQA();
  const entry = {
    id: randomUUID(),
    category,
    question,
    answer,
    keywords: Array.isArray(keywords) ? keywords : [],
    followUps: Array.isArray(followUps) ? followUps : [],
  };

  qa.push(entry);
  saveQA(qa);
  res.status(201).json(entry);
});

// PUT /api/admin/qa/:id — update entry
router.put("/qa/:id", (req, res) => {
  const qa = loadQA();
  const idx = qa.findIndex((q) => q.id === req.params.id);

  if (idx === -1) return res.status(404).json({ error: "Entry not found" });

  const { category, question, answer, keywords, followUps } = req.body;
  qa[idx] = {
    ...qa[idx],
    ...(category !== undefined && { category }),
    ...(question !== undefined && { question }),
    ...(answer !== undefined && { answer }),
    ...(Array.isArray(keywords) && { keywords }),
    ...(Array.isArray(followUps) && { followUps }),
  };

  saveQA(qa);
  res.json(qa[idx]);
});

// DELETE /api/admin/qa/:id — delete entry
router.delete("/qa/:id", (req, res) => {
  const qa = loadQA();
  const idx = qa.findIndex((q) => q.id === req.params.id);

  if (idx === -1) return res.status(404).json({ error: "Entry not found" });

  qa.splice(idx, 1);
  saveQA(qa);
  res.json({ success: true });
});

export default router;
