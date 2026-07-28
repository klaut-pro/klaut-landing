import type { BlogPost } from "./types";
import { postsData } from "./posts-data";

export type { BlogBlock, BlogPost } from "./types";

export const posts: BlogPost[] = postsData;

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return posts.slice(0, limit);
}
