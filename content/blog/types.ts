export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pull"; text: string }
  | { type: "note"; label: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  teaser: string;
  deck: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  category: "howto" | "compare" | "explain" | "field";
  blocks: BlogBlock[];
  nextSlug?: string;
  prevSlug?: string;
};
