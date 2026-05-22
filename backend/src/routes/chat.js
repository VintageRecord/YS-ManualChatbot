import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QA_PATH = path.join(__dirname, "../data/qa.json");

const router = express.Router();

function loadQA() {
  return JSON.parse(readFileSync(QA_PATH, "utf-8"));
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findBestMatch(message, qaList) {
  const norm = normalize(message);
  const words = norm.split(" ").filter((w) => w.length > 2);

  let best = null;
  let bestScore = 0;

  for (const qa of qaList) {
    let score = 0;

    for (const kw of qa.keywords) {
      const normKw = normalize(kw);
      if (norm.includes(normKw)) {
        score += normKw.split(" ").length * 2;
      }
    }

    const qWords = normalize(qa.question)
      .split(" ")
      .filter((w) => w.length > 3);
    for (const qw of qWords) {
      if (words.includes(qw)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }

  return bestScore > 0 ? best : null;
}

function buildResponse(match, qaList) {
  const followUps = (match.followUps || [])
    .map((fid) => qaList.find((q) => q.id === fid))
    .filter(Boolean)
    .map((q) => ({ label: q.question, id: q.id }));

  return {
    id: match.id,
    response: match.answer,
    matched: true,
    category: match.category,
    followUps,
  };
}

router.post("/", (req, res) => {
  const { message, id } = req.body;
  const qaList = loadQA();

  // Direct ID lookup from chip buttons — bypasses keyword matching entirely
  if (id) {
    const entry = qaList.find((q) => q.id === id);
    if (entry) return res.json(buildResponse(entry, qaList));
  }

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message or id is required" });
  }

  const match = findBestMatch(message.trim(), qaList);

  if (!match) {
    return res.json({
      response:
        "Maaf, saya tidak dapat mencari jawapan berkaitan soalan anda. Sila pilih topik di bawah atau cuba soalan yang lebih spesifik.",
      matched: false,
      followUps: [],
    });
  }

  res.json(buildResponse(match, qaList));
});

// GET /api/chat/faq/:category — all Q&A entries for a category (id + question only)
router.get("/faq/:category", (req, res) => {
  const qaList = loadQA();
  const items = qaList
    .filter((qa) => qa.category === req.params.category)
    .map((qa) => ({ id: qa.id, question: qa.question }));
  res.json(items);
});

// GET /api/chat/categories — all distinct categories with their best entry ID
router.get("/categories", (req, res) => {
  const qaList = loadQA();
  const seen = new Set();
  const result = [];
  for (const qa of qaList) {
    if (!qa.category || seen.has(qa.category)) continue;
    seen.add(qa.category);
    const overviewId = `${qa.category.toLowerCase()}-overview`;
    const overviewEntry = qaList.find((q) => q.category === qa.category && q.id === overviewId);
    const firstEntry = qaList.find((q) => q.category === qa.category);
    result.push({
      category: qa.category,
      overviewId: (overviewEntry ?? firstEntry)?.id ?? null,
    });
  }
  res.json(result);
});

export default router;
