import express from "express";
import {
  readFileSync, writeFileSync, existsSync,
  copyFileSync, mkdirSync, readdirSync, unlinkSync,
} from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QA_PATH       = path.join(__dirname, "../data/qa.json");
const LOG_PATH      = path.join(__dirname, "../data/log.json");
const SNAPSHOT_DIR  = path.join(__dirname, "../data/snapshots");
const MAX_SNAPSHOTS = 20;

const router = express.Router();

function loadQA() {
  return JSON.parse(readFileSync(QA_PATH, "utf-8"));
}

function saveSnapshot() {
  try {
    if (!existsSync(SNAPSHOT_DIR)) mkdirSync(SNAPSHOT_DIR, { recursive: true });
    const filename = `qa.${Date.now()}.json`;
    copyFileSync(QA_PATH, path.join(SNAPSHOT_DIR, filename));

    // Prune oldest snapshots beyond MAX_SNAPSHOTS
    const files = readdirSync(SNAPSHOT_DIR)
      .filter((f) => f.startsWith("qa.") && f.endsWith(".json"))
      .sort();
    for (const old of files.slice(0, Math.max(0, files.length - MAX_SNAPSHOTS))) {
      unlinkSync(path.join(SNAPSHOT_DIR, old));
    }
  } catch (e) {
    console.error("Failed to save snapshot:", e);
  }
}

function saveQA(data) {
  saveSnapshot();
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

// GET /api/admin/snapshots — list available snapshots (newest first)
router.get("/snapshots", (req, res) => {
  try {
    if (!existsSync(SNAPSHOT_DIR)) return res.json([]);
    const files = readdirSync(SNAPSHOT_DIR)
      .filter((f) => f.startsWith("qa.") && f.endsWith(".json"))
      .sort()
      .reverse();

    const snapshots = files.map((filename) => {
      const ts = parseInt(filename.replace("qa.", "").replace(".json", ""), 10);
      const data = JSON.parse(readFileSync(path.join(SNAPSHOT_DIR, filename), "utf-8"));
      return {
        filename,
        timestamp: new Date(ts).toISOString(),
        entryCount: data.length,
      };
    });
    res.json(snapshots);
  } catch (e) {
    res.status(500).json({ error: "Failed to read snapshots" });
  }
});

// POST /api/admin/snapshots/:filename/restore — restore a snapshot
router.post("/snapshots/:filename/restore", (req, res) => {
  const { filename } = req.params;
  if (!filename.startsWith("qa.") || !filename.endsWith(".json") || filename.includes("/")) {
    return res.status(400).json({ error: "Invalid snapshot filename" });
  }
  const src = path.join(SNAPSHOT_DIR, filename);
  if (!existsSync(src)) return res.status(404).json({ error: "Snapshot not found" });

  try {
    saveSnapshot(); // snapshot current state before overwriting
    copyFileSync(src, QA_PATH);
    const restored = loadQA();
    res.json({ success: true, entryCount: restored.length });
  } catch (e) {
    res.status(500).json({ error: "Failed to restore snapshot" });
  }
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
