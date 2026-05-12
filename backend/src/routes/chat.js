import express from "express";
import { generateEmbedding, generateResponse } from "../services/gemini.js";
import { searchDocuments } from "../services/supabase.js";
import { needsWebSearch, searchWeb } from "../services/tavily.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Step 1: Search local documents (vector search)
    const embedding = await generateEmbedding(message);
    const localResults = await searchDocuments(embedding, 5);

    // Step 2: Search web if query seems time-sensitive
    let webResults = [];
    if (needsWebSearch(message)) {
      webResults = await searchWeb(message);
    }

    // Step 3: Combine context from both sources
    const context = [
      ...localResults.map((r) => ({
        content: r.content,
        source: r.metadata?.filename || "document",
      })),
      ...webResults.map((r) => ({
        content: r.content,
        source: r.url,
      })),
    ];

    // Step 4: Generate AI response
    const response = await generateResponse(message, context, history);

    res.json({
      response,
      sources: {
        localDocuments: localResults.length,
        webResults: webResults.length,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
