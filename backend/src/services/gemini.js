import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate embeddings for text
export async function generateEmbedding(text) {
  // Try newer models first, fall back if not available
  const embeddingModels = ["text-embedding-004", "embedding-001"];

  for (const modelName of embeddingModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch {
      continue;
    }
  }
  throw new Error("No embedding model available");
}

// Generate AI response with context
export async function generateResponse(userMessage, context, chatHistory = []) {
  // Try models in order of preference
  const chatModels = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-pro",
  ];

  const systemInstruction = `Anda adalah pembantu AI untuk Yayasan Sabah yang membantu pelajar mendapatkan maklumat tentang biasiswa, pinjaman, dan peluang pendidikan di Sabah, Malaysia.

Peraturan utama:
- Jawab dalam bahasa yang sama dengan pengguna (Bahasa Malaysia atau Bahasa Inggeris)
- Gunakan maklumat dari konteks yang diberikan sebagai keutamaan
- Jika maklumat tidak ada dalam konteks, gunakan pengetahuan umum anda
- Sentiasa jujur jika anda tidak pasti tentang sesuatu maklumat
- Berikan jawapan yang ringkas, tepat dan membantu
- Fokus pada topik pendidikan, biasiswa, PTPTN, JPA, MARA dan program Yayasan Sabah`;

  const history = chatHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const contextSection =
    context.length > 0
      ? `\nMaklumat Relevan:\n${context.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n")}\n`
      : "";

  const prompt = `${contextSection}\nSoalan: ${userMessage}`;

  for (const modelName of chatModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      console.log(`✅ Using model: ${modelName}`);
      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelName} failed: ${err.message}`);
      continue;
    }
  }

  throw new Error("All Gemini models failed. Please check your API key at aistudio.google.com");
}
