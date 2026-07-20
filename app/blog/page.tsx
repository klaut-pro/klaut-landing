import type { Metadata } from "next";
import Link from "next/link";
import { Atmosphere } from "@/components/motion/Atmosphere";
import { Reveal } from "@/components/motion/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short notes on infrastructure, identity, and day-to-day work with agent swarms.",
  alternates: { canonical: "https://klaut.pro/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <Atmosphere />
      <SiteHeader variant="blog" />
      <main className="blog-index">
        <div className="wrap">
          <h1>From the field</h1>
          <p className="section-lede">
            Infrastructure, identity, and day-to-day work with agent swarms.
          </p>
          <div className="posts">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delayMs={i * 80}>
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
