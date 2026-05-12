import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate embeddings for text (768 dimensions)
export async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Generate AI response with context
export async function generateResponse(userMessage, context, chatHistory = []) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Anda adalah pembantu AI untuk Yayasan Sabah yang membantu pelajar mendapatkan maklumat tentang biasiswa, pinjaman, dan peluang pendidikan di Sabah, Malaysia.

Peraturan utama:
- Jawab dalam bahasa yang sama dengan pengguna (Bahasa Malaysia atau Bahasa Inggeris)
- Gunakan maklumat dari konteks yang diberikan sebagai keutamaan
- Jika maklumat tidak ada dalam konteks, gunakan pengetahuan umum anda
- Sentiasa jujur jika anda tidak pasti tentang sesuatu maklumat
- Berikan jawapan yang ringkas, tepat dan membantu
- Fokus pada topik pendidikan, biasiswa, PTPTN, JPA, MARA dan program Yayasan Sabah`,
  });

  // Format history for Gemini
  const history = chatHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history });

  // Build prompt with context
  const contextSection =
    context.length > 0
      ? `\nMaklumat Relevan:\n${context.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n")}\n`
      : "";

  const prompt = `${contextSection}\nSoalan: ${userMessage}`;
  const result = await chat.sendMessage(prompt);
  return result.response.text();
}
