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

    // Step 1: Search local documents (vector search) — fail silently if Supabase not ready
    let localResults = [];
    try {
      const embedding = await generateEmbedding(message);
      localResults = await searchDocuments(embedding, 5);
      console.log(`📄 PDF search: ${localResults.length} chunks found${localResults.length > 0 ? ` (top similarity: ${localResults[0].similarity?.toFixed(3)})` : ""}`);
    } catch (err) {
      console.warn("Vector search skipped:", err.message);
    }

    // Step 2: Search web if:
    //   - Query is time-sensitive (live data needed regardless of PDFs), OR
    //   - PDF search returned nothing (knowledge base doesn't cover this topic)
    let webResults = [];
    try {
      const noLocalContext = localResults.length === 0;
      if (needsWebSearch(message) || noLocalContext) {
        webResults = await searchWeb(message);
        console.log(`🌐 Web search triggered — reason: ${needsWebSearch(message) ? "time-sensitive query" : "no PDF context found"}`);
      }
    } catch (err) {
      console.warn("Web search skipped:", err.message);
    }

    // Step 3: Combine context
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
    console.error("Chat error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;

