import { PrismaClient } from '@prisma/client';

export type EmbeddingFn = (text: string) => Promise<number[]>;
export type ExpandFn = (query: string) => Promise<string[]>;

export interface RagSearchOptions {
  denseWeight?: number;
  sparseWeight?: number;
  topK?: number;
  returnK?: number;
  language?: string; // for tsvector
}

export interface RagSearchResult {
  id: number;
  parent_id: number;
  source_path: string;
  content: string;
  score: number;
  dense_score?: number;
  sparse_score?: number;
}

export interface IRagSearch {
  search(query: string): Promise<RagSearchResult[]>;
}

export interface RagSearchDeps {
  prisma: PrismaClient;
  embedder?: EmbeddingFn;
  expander?: ExpandFn;
  options?: RagSearchOptions;
}
