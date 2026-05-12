import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

// Determine if a query needs web search
export function needsWebSearch(query) {
  const webKeywords = [
    // Time-sensitive
    "terkini", "baru", "2024", "2025", "2026",
    "tarikh", "deadline", "bila", "when", "latest",
    "recent", "semasa", "sekarang", "now", "current",
    "berita", "news", "announce", "pengumuman",
    // Scholarship specific
    "biasiswa", "scholarship", "ptptn", "jpa", "mara",
    "yayasan sabah", "permohonan", "apply", "mohon",
    "kelayakan", "syarat", "eligibility", "nilai",
    "elaun", "allowance", "amount", "berapa",
    "cara", "how", "langkah", "step", "proses",
    "dokumen", "document", "required", "diperlukan",
    "hubungi", "contact", "telefon", "alamat",
  ];
  const lower = query.toLowerCase();
  return webKeywords.some((kw) => lower.includes(kw));
}

// Search the web for relevant info
export async function searchWeb(query) {
  try {
    const response = await client.search(query, {
      searchDepth: "basic",
      maxResults: 3,
      includeAnswer: true,
    });

    return response.results.map((r) => ({
      content: `${r.title}: ${r.content}`,
      url: r.url,
    }));
  } catch (error) {
    console.error("Tavily search error:", error.message);
    return [];
  }
}
