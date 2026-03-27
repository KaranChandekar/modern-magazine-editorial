"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/content/articles";

interface Props {
  article: Article;
}

export default function Hero({ article }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setOffsetY(window.scrollY * 0.3);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden"
    >
      {/* Parallax Image */}
      <div
        className="absolute inset-0 will-change-transform scale-110"
        style={{ transform: `translateY(${offsetY}px)` }}
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

      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white rounded-full mb-5"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Featured
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif font-bold text-white leading-[1.05] max-w-4xl mb-5"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/75 max-w-2xl mb-8 text-lg md:text-xl leading-relaxed"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-5 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <Image
                src={article.authorAvatar}
                alt={article.author}
                width={40}
                height={40}
                className="rounded-full border-2 border-white/20 object-cover"
              />
              <div>
                <p className="text-white text-sm font-semibold">
                  {article.author}
                </p>
                <p className="text-white/50 text-xs">
                  {article.date} &middot; {article.readTime}
                </p>
              </div>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="px-7 py-3 rounded-full text-white font-semibold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Read Article
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
