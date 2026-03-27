"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "@/content/articles";

interface Props {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onSelect }: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!tabsRef.current) return;
    const activeIndex = categories.indexOf(activeCategory);
    const tab = tabsRef.current.children[activeIndex] as HTMLElement;
    if (tab) {
      setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
  }, [activeCategory]);

  return (
    <div className="relative mb-12 overflow-x-auto pb-1 -mx-2 px-2">
      <div ref={tabsRef} className="flex gap-1.5 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-300 relative z-10"
            style={{
              color:
                cat === activeCategory ? "white" : "var(--color-text-muted)",
            }}
          >
            {cat}
          </button>
        ))}
        <motion.div
          className="absolute top-0 h-full rounded-full -z-0"
          style={{ backgroundColor: "var(--color-accent)" }}
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      </div>
    </div>
  );
}
