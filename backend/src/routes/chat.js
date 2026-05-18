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

    // Score by keyword phrases (longer phrases score higher)
    for (const kw of qa.keywords) {
      const normKw = normalize(kw);
      if (norm.includes(normKw)) {
        score += normKw.split(" ").length * 2;
      }
    }

    // Score by individual word overlap with the stored question
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

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const qaList = loadQA();
  const match = findBestMatch(message.trim(), qaList);

  if (!match) {
    return res.json({
      response:
        "Maaf, saya tidak dapat mencari jawapan berkaitan soalan anda. Sila pilih topik di bawah atau cuba soalan yang lebih spesifik.",
      matched: false,
      followUps: [],
    });
  }

  // Resolve follow-up IDs to labels + queries
  const followUps = (match.followUps || [])
    .map((fid) => qaList.find((q) => q.id === fid))
    .filter(Boolean)
    .map((q) => ({ label: q.question, id: q.id }));

  res.json({
    response: match.answer,
    matched: true,
    category: match.category,
    followUps,
  });
});

export default router;
