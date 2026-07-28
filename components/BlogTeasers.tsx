import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getLatestPosts } from "@/content/blog";

export function BlogTeasers() {
  const latest = getLatestPosts(3);
  return (
    <section className="blog" id="blog">
      <div className="wrap">
        <h2>From the field</h2>
        <p className="section-lede">
          How-tos, comparisons, and plain-language notes on MCP and agent tools.
        </p>
        <div className="posts">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delayMs={i * 80}>
              <Link className="post" href={`/blog/${post.slug}`}>
                <time dateTime={post.date}>{post.dateLabel}</time>
                <h3>{post.title}</h3>
                <p>{post.teaser}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.5rem" }}>
          <Link className="text-link" href="/blog">
            All posts
          </Link>
        </p>
      </div>
    </section>
  );
}
