"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ReadingProgress from "@/components/ReadingProgress";
import ImageLightbox from "@/components/ImageLightbox";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/content/articles";

function PullQuote({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.blockquote
      className="relative pl-8 py-6 my-12 italic font-serif text-xl md:text-2xl leading-relaxed"
      style={{ color: "var(--color-text)" }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
        style={{
          backgroundColor: "var(--color-accent)",
          transform: revealed ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      &ldquo;{text}&rdquo;
    </motion.blockquote>
  );
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setParallaxY(window.scrollY * 0.35);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Article Not Found
          </h1>
          <Link
            href="/"
            className="underline text-sm"
            style={{ color: "var(--color-accent)" }}
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article);
  const paragraphs = article.body.split("\n\n").filter(Boolean);
  const pullQuoteIndex = Math.floor(paragraphs.length / 2);
  const pullQuoteText =
    paragraphs[pullQuoteIndex]?.length > 120
      ? paragraphs[pullQuoteIndex].slice(0, 120) + "..."
      : paragraphs[pullQuoteIndex];

  return (
    <>
      <ReadingProgress />

      {/* Hero Image with Parallax */}
      <div
        ref={heroRef}
        className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden"
      >
        <div
          className="absolute inset-0 scale-110 will-change-transform"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-6 pb-14 w-full text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white rounded-full mb-5"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {article.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-serif font-bold text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {article.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <Image
                src={article.authorAvatar}
                alt={article.author}
                width={36}
                height={36}
                className="rounded-full border-2 border-white/20 object-cover"
              />
              <div className="text-left">
                <p className="text-white text-sm font-semibold">
                  {article.author}
                </p>
                <p className="text-white/50 text-xs">
                  {article.date} &middot; {article.readTime}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-2xl mx-auto px-6 py-14">
        <div className="drop-cap">
          {paragraphs.map((paragraph, idx) => (
            <div key={idx}>
              {idx === pullQuoteIndex && <PullQuote text={pullQuoteText} />}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
                className="mb-7 leading-[1.85] text-[1.05rem]"
                style={{ color: "var(--color-text)" }}
              >
                {paragraph}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Article Image */}
        <div className="my-12">
          <ImageLightbox
            src={article.image}
            alt={article.title}
            className="rounded-2xl"
          />
          <p
            className="text-center text-xs mt-4 italic"
            style={{ color: "var(--color-text-muted)" }}
          >
            Photo for &ldquo;{article.title}&rdquo;
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 mb-8">
          {[article.category, "Editorial", "Featured"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Back link */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.1em] transition-colors"
            style={{ color: "var(--color-accent)" }}
          >
            &larr; All Stories
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section
          className="max-w-7xl mx-auto px-6 py-16"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
            style={{ color: "var(--color-accent)" }}
          >
            Keep Reading
          </span>
          <h2
            className="font-serif text-2xl md:text-3xl font-bold mb-10"
            style={{ color: "var(--color-text)" }}
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {related.map((a, idx) => (
              <ArticleCard key={a.id} article={a} index={idx} />
            ))}
          </div>
        </section>
      )}

      <NewsletterSignup />
    </>
  );
}
