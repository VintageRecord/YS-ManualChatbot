import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

// Determine if a query needs web search
export function needsWebSearch(query) {
  const webKeywords = [
    "terkini", "baru", "2024", "2025", "2026",
    "tarikh", "deadline", "bila", "when", "latest",
    "recent", "semasa", "sekarang", "now", "current",
    "berita", "news", "announce", "pengumuman",
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
