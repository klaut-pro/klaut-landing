import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { posts } from "@/content/blog";

export function BlogTeasers() {
  return (
    <section className="blog" id="blog">
      <div className="wrap">
        <h2>From the field</h2>
        <p className="section-lede">
          Short notes on infrastructure, identity, and day-to-day work with
          agent swarms.
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
    </section>
  );
}
