import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Search for similar documents using vector similarity
export async function searchDocuments(embedding, matchCount = 5) {
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.3,
    match_count: matchCount,
  });

  if (error) throw new Error(`Supabase search error: ${error.message}`);
  return data || [];
}

// Store document chunk with embedding
export async function storeChunk(content, metadata, embedding) {
  const { error } = await supabase.from("documents").insert({
    content,
    metadata,
    embedding,
  });

  if (error) throw new Error(`Supabase insert error: ${error.message}`);
}

// Delete all chunks for a specific file
export async function deleteDocumentByFile(filename) {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("metadata->>filename", filename);

  if (error) throw new Error(`Supabase delete error: ${error.message}`);
}

// List all uploaded documents
export async function listDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("metadata, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Supabase list error: ${error.message}`);

  // Return unique filenames
  const seen = new Set();
  return (data || []).filter((doc) => {
    const key = doc.metadata?.filename;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default supabase;
