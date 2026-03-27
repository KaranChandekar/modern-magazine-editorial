"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/content/articles";

interface Props {
  article: Article;
  featured?: boolean;
  index?: number;
  revealType?: "circle" | "diagonal" | "curtain";
}

export default function ArticleCard({
  article,
  featured = false,
  index = 0,
  revealType = "diagonal",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = ((e.clientY - rect.top - centerY) / centerY) * 6;
      const y = -((e.clientX - rect.left - centerX) / centerX) * 6;
      setTilt({ x, y });
    },
    [isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsTouch(true)}
      onViewportEnter={() => setImageRevealed(true)}
      className={`group card-shine rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-2xl ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        perspective: "1200px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out, box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
        backgroundColor: "var(--color-card-bg)",
        border: "1px solid var(--color-border)",
      }}
    >
      <Link href={`/article/${article.slug}`} className="block h-full">
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <div
            className={`reveal-${revealType} ${imageRevealed ? "revealed" : ""} h-full`}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={featured}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          <span
            className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {article.category}
          </span>
        </div>

        <div className={`p-5 ${featured ? "md:p-7" : ""}`}>
          <h3
            className={`font-serif font-bold leading-tight mb-2.5 group-hover:underline decoration-1 underline-offset-4 transition-all duration-300 ${
              featured ? "text-xl md:text-3xl" : "text-base md:text-lg"
            }`}
            style={{
              color: "var(--color-text)",
              textDecorationColor: "var(--color-accent)",
            }}
          >
            {article.title}
          </h3>
          <p
            className={`leading-relaxed mb-4 ${
              featured ? "text-sm md:text-base" : "text-sm"
            }`}
            style={{ color: "var(--color-text-muted)" }}
          >
            {article.excerpt}
          </p>
          <div
            className="flex items-center gap-3 pt-3"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <Image
              src={article.authorAvatar}
              alt={article.author}
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <span
                className="text-xs font-semibold block truncate"
                style={{ color: "var(--color-text)" }}
              >
                {article.author}
              </span>
              <span
                className="text-[11px] block"
                style={{ color: "var(--color-text-muted)" }}
              >
                {article.date} &middot; {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
