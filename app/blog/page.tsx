import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "How-tos, comparisons, and explainers for MCP, agent tools, and unified token billing.",
  alternates: { canonical: "https://klaut.pro/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader variant="blog" />
      <main className="blog-index">
        <div className="wrap">
          <h1>From the field</h1>
          <p className="section-lede">
            How-tos, comparisons, keyword explainers, and competitor notes for
            teams building with MCP.
          </p>
          <div className="posts">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delayMs={Math.min(i * 40, 200)}>
                <Link className="post" href={`/blog/${post.slug}`}>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <h3>{post.title}</h3>
                  <p>{post.teaser}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
