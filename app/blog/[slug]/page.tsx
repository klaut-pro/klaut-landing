import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Atmosphere } from "@/components/motion/Atmosphere";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { Reveal } from "@/components/motion/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllSlugs, getPost } from "@/content/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.teaser,
    alternates: { canonical: `https://klaut.pro/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.teaser,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const next = post.nextSlug ? getPost(post.nextSlug) : undefined;
  const prev = post.prevSlug ? getPost(post.prevSlug) : undefined;

  return (
    <>
      <ReadingProgress />
      <Atmosphere />
      <SiteHeader variant="blog" />
      <article>
        <header className="article-hero wrap-narrow">
          <Reveal>
            <p className="article-meta">
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1>{post.title}</h1>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="article-deck">{post.deck}</p>
          </Reveal>
        </header>

        <div className="wrap-narrow prose">
          {post.blocks.map((block, i) => {
            const delay = Math.min(i * 40, 200);
            if (block.type === "p") {
              return (
                <Reveal key={i} delayMs={delay}>
                  <p>{block.text}</p>
                </Reveal>
              );
            }
            if (block.type === "h2") {
              return (
                <Reveal key={i} delayMs={delay}>
                  <h2>{block.text}</h2>
                </Reveal>
              );
            }
            if (block.type === "pull") {
              return (
                <Reveal key={i} delayMs={delay}>
                  <blockquote className="pull">{block.text}</blockquote>
                </Reveal>
              );
            }
            return (
              <Reveal key={i} delayMs={delay}>
                <aside className="note">
                  <strong>{block.label}</strong> {block.text}
                </aside>
              </Reveal>
            );
          })}
        </div>

        <footer className="article-footer wrap-narrow">
          <Link className="btn btn-primary" href="/#waitlist">
            Join early access
          </Link>
          {next ? (
            <Link className="text-link" href={`/blog/${next.slug}`}>
              Next: {next.title} →
            </Link>
          ) : null}
          {prev ? (
            <Link className="text-link" href={`/blog/${prev.slug}`}>
              ← {prev.title}
            </Link>
          ) : null}
        </footer>
      </article>
    </>
  );
}
