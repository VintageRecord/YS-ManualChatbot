import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate embeddings for text using the v1 REST API directly
// (the @google/generative-ai SDK uses v1beta which no longer exposes embedding models)
export async function generateEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in .env");

  const embeddingModels = ["text-embedding-004", "embedding-001"];
  let lastError;

  for (const modelName of embeddingModels) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${modelName}:embedContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: { parts: [{ text }] } }),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message ?? `HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log(`✅ Using embedding model: ${modelName}`);
      return data.embedding.values;
    } catch (err) {
      console.warn(`Embedding model ${modelName} failed: ${err.message}`);
      lastError = err;
    }
  }
  throw new Error(`No embedding model available: ${lastError?.message ?? "unknown error"}`);
}

// Generate AI response with context
export async function generateResponse(userMessage, context, chatHistory = []) {
  const chatModels = [
    "gemini-2.5-flash",
    "gemini-3.0-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite",
  ];

  const systemInstruction = `Anda adalah pembantu AI untuk Yayasan Sabah yang membantu pelajar mendapatkan maklumat tentang biasiswa, pinjaman, dan peluang pendidikan di Sabah, Malaysia.

Peraturan utama:
- Jawab dalam bahasa yang sama dengan pengguna (Bahasa Malaysia atau Bahasa Inggeris)
- Gunakan maklumat dari konteks yang diberikan sebagai keutamaan
- Jika maklumat tidak ada dalam konteks, gunakan pengetahuan umum anda untuk menjawab
- JANGAN suruh pengguna pergi ke laman web lain atau rujuk laman rasmi — jawab terus dengan maklumat yang ada
- JANGAN kata "sila rujuk laman web rasmi" atau "sila hubungi pihak berkenaan" sebagai jawapan utama
- Berikan jawapan yang lengkap, tepat dan membantu berdasarkan pengetahuan anda
- Hanya cadangkan laman web rasmi sebagai maklumat TAMBAHAN di hujung jawapan, bukan sebagai pengganti jawapan
- Ingat konteks perbualan sebelum ini dan jawab berdasarkan keseluruhan perbualan
- Fokus pada topik pendidikan, biasiswa, PTPTN, JPA, MARA dan program Yayasan Sabah`;

  const contextSection =
    context.length > 0
      ? `\nMaklumat Relevan dari dokumen dan web:\n${context.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n")}\n`
      : "";

  // Build full conversation history as Contents array
  // This preserves memory across all previous turns
  const contents = [
    // All previous exchanges
    ...chatHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
    // Current user message with RAG context injected
    {
      role: "user",
      parts: [{ text: `${contextSection}\nSoalan: ${userMessage}` }],
    },
  ];

  for (const modelName of chatModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      });
      const result = await model.generateContent({ contents });
      console.log(`✅ Using model: ${modelName}`);
      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelName} failed: ${err.message}`);
      continue;
    }
  }

  throw new Error("All Gemini models failed. Please check your API key at aistudio.google.com");
}
