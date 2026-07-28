import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";

const base = "https://klaut.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.reduce(
    (max, post) => (post.date > max ? post.date : max),
    posts[0]?.date ?? "2026-07-28",
  );

  return [
    {
      url: base,
      lastModified: new Date(latestPost),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(latestPost),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
