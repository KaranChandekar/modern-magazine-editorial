"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";
import { articles, getArticlesByCategory } from "@/content/articles";

const revealTypes: Array<"circle" | "diagonal" | "curtain"> = [
  "diagonal",
  "circle",
  "curtain",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredArticle = articles.find((a) => a.featured)!;
  const carouselArticles = articles.slice(0, 8);

  const filteredArticles = useMemo(
    () => getArticlesByCategory(activeCategory),
    [activeCategory]
  );

  return (
    <>
      <Hero article={featuredArticle} />

      {/* Featured Carousel */}
      <FeaturedCarousel articles={carouselArticles} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ borderTop: "1px solid var(--color-border)" }} />
      </div>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
            style={{ color: "var(--color-accent)" }}
          >
            Explore
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            Latest Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Curated articles across design, technology, culture, and more.
          </motion.p>
        </div>

        <CategoryFilter
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 auto-rows-auto"
          >
            {filteredArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={idx === 0 && activeCategory === "All"}
                index={idx}
                revealType={revealTypes[idx % 3]}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <NewsletterSignup />
    </>
  );
}
