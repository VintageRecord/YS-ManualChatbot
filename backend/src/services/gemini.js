import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cached working embedding config — probed once, reused for all chunks
let embeddingConfig = null;

async function probeEmbeddingConfig(apiKey) {
  // List available models so we can see exactly what this key supports
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=100`
    );
    if (listRes.ok) {
      const { models = [] } = await listRes.json();
      const available = models
        .filter((m) => m.supportedGenerationMethods?.includes("embedContent"))
        .map((m) => m.name);
      console.log("📋 Embedding models available for your key:", available.join(", ") || "(none found — check your API key restrictions)");
    }
  } catch (e) {
    console.warn("Could not list models:", e.message);
  }

  // Try every known embedding model on both API versions
  const candidates = [
    { model: "gemini-embedding-exp-03-07", apiVersion: "v1beta", body: { content: { parts: [{ text: "probe" }] }, outputDimensionality: 768 } },
    { model: "text-embedding-005",         apiVersion: "v1beta", body: { content: { parts: [{ text: "probe" }] } } },
    { model: "text-embedding-004",         apiVersion: "v1beta", body: { content: { parts: [{ text: "probe" }] } } },
    { model: "embedding-001",              apiVersion: "v1beta", body: { content: { parts: [{ text: "probe" }] } } },
    { model: "gemini-embedding-exp-03-07", apiVersion: "v1",     body: { content: { parts: [{ text: "probe" }] }, outputDimensionality: 768 } },
    { model: "text-embedding-005",         apiVersion: "v1",     body: { content: { parts: [{ text: "probe" }] } } },
    { model: "text-embedding-004",         apiVersion: "v1",     body: { content: { parts: [{ text: "probe" }] } } },
    { model: "embedding-001",              apiVersion: "v1",     body: { content: { parts: [{ text: "probe" }] } } },
  ];

  for (const { model, apiVersion, body } of candidates) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:embedContent?key=${apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.embedding?.values?.length) {
          console.log(`✅ Embedding resolved: ${model} (${apiVersion})`);
          return { model, apiVersion, useOutputDimensionality: !!body.outputDimensionality };
        }
      }
    } catch {}
  }
  return null;
}

export async function generateEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in .env");

  if (!embeddingConfig) {
    embeddingConfig = await probeEmbeddingConfig(apiKey);
    if (!embeddingConfig) {
      throw new Error(
        "No embedding model is available for your GEMINI_API_KEY. " +
        "Check the '📋 Embedding models' log above. If it shows '(none found)', " +
        "go to aistudio.google.com/apikey, create a new unrestricted key, and update your .env file."
      );
    }
  }

  const { model, apiVersion, useOutputDimensionality } = embeddingConfig;
  const body = { content: { parts: [{ text }] } };
  if (useOutputDimensionality) body.outputDimensionality = 768;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:embedContent?key=${apiKey}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!response.ok) {
    const err = await response.json();
    embeddingConfig = null; // reset so next call re-probes
    throw new Error(err.error?.message ?? `HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.embedding.values;
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
