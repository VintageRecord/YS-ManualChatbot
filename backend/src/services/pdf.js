import pdfParse from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";

// Extract text from PDF file
export async function extractTextFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
}

// Split text into chunks with overlap
export function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim().length > 50) {
      chunks.push(chunk.trim());
    }
    if (i + chunkSize >= words.length) break;
  }

  return chunks;
}
