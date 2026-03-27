"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/content/articles";

interface Props {
  articles: Article[];
}

export default function FeaturedCarousel({ articles }: Props) {
  const items = [...articles, ...articles];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
            style={{ color: "var(--color-accent)" }}
          >
            Editor&apos;s Picks
          </span>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Featured Stories
          </h2>
        </motion.div>
      </div>

      <div className="marquee-mask group">
        <div className="marquee-track">
          {items.map((article, idx) => (
            <Link
              key={`${article.id}-${idx}`}
              href={`/article/${article.slug}`}
              className="marquee-item flex-shrink-0 w-[300px] md:w-[340px]"
              draggable={false}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 group-hover:[animation-play-state:paused]"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-white mb-3 inline-block"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {article.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-xs mt-2">
                    {article.author} &middot; {article.readTime}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
