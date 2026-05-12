-- Run this SQL in your Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste & Run

-- Step 1: Enable pgvector extension
create extension if not exists vector;

-- Step 2: Create documents table
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb default '{}',
  embedding vector(768),
  created_at timestamp with time zone default now()
);

-- Step 3: Create index for faster vector search
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Step 4: Create similarity search function
create or replace function match_documents(
  query_embedding vector(768),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
