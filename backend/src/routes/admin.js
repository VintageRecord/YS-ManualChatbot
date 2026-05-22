import express from "express";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QA_PATH  = path.join(__dirname, "../data/qa.json");
const LOG_PATH = path.join(__dirname, "../data/log.json");

const router = express.Router();

function loadQA() {
  return JSON.parse(readFileSync(QA_PATH, "utf-8"));
}

function saveQA(data) {
  writeFileSync(QA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function loadLog() {
  if (!existsSync(LOG_PATH)) return [];
  return JSON.parse(readFileSync(LOG_PATH, "utf-8"));
}

function appendLog(action, entry) {
  try {
    const log = loadLog();
    log.unshift({
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      action,
      entryId: entry.id,
      question: entry.question,
      category: entry.category,
    });
    writeFileSync(LOG_PATH, JSON.stringify(log.slice(0, 200), null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write log:", e);
  }
}

// GET /api/admin/qa — list all entries
router.get("/qa", (req, res) => {
  res.json(loadQA());
});

// GET /api/admin/log — action history
router.get("/log", (req, res) => {
  res.json(loadLog());
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
  appendLog("create", entry);
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
  appendLog("edit", qa[idx]);
  res.json(qa[idx]);
});

// DELETE /api/admin/qa/:id — delete entry
router.delete("/qa/:id", (req, res) => {
  const qa = loadQA();
  const idx = qa.findIndex((q) => q.id === req.params.id);

  if (idx === -1) return res.status(404).json({ error: "Entry not found" });

  const deleted = qa[idx];
  qa.splice(idx, 1);
  saveQA(qa);
  appendLog("delete", deleted);
  res.json({ success: true });
});

export default router;
