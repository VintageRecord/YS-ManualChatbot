import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

// Determine if a query needs web search.
// Only trigger for genuinely time-sensitive questions — topic keywords like
// "biasiswa" or "syarat" are handled by the PDF knowledge base, not the web.
export function needsWebSearch(query) {
  const timeSensitiveKeywords = [
    // Recency signals
    "terkini", "terbaru", "latest", "recent", "current", "now",
    "semasa", "sekarang", "masa kini",
    // Specific years
    "2024", "2025", "2026", "2027",
    // Dates & deadlines
    "tarikh", "deadline", "due date", "closing date",
    "tutup permohonan", "buka permohonan",
    "bila", "when", "bilakah",
    // News & announcements
    "berita", "news", "announcement", "pengumuman",
    "keputusan", "result", "announced",
  ];
  const lower = query.toLowerCase();
  return timeSensitiveKeywords.some((kw) => lower.includes(kw));
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
