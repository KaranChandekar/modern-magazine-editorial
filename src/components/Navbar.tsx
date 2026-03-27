"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-bg) 90%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-1.5 group"
        >
          <span
            className={`font-serif font-bold tracking-tight transition-all duration-500 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
            style={{ color: scrolled ? "var(--color-accent)" : "#fff" }}
          >
            VOGUE
          </span>
          <span
            className={`font-sans font-light text-[10px] tracking-[0.25em] uppercase transition-colors duration-500`}
            style={{ color: scrolled ? "var(--color-text-muted)" : "rgba(255,255,255,0.7)" }}
          >
            Editorial
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {["Design", "Technology", "Culture", "Travel"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-100"
              style={{
                color: scrolled
                  ? "var(--color-text)"
                  : "rgba(255,255,255,0.8)",
                opacity: 0.85,
              }}
            >
              {item}
            </Link>
          ))}
          <div
            className="w-px h-5 mx-1"
            style={{ backgroundColor: scrolled ? "var(--color-border)" : "rgba(255,255,255,0.2)" }}
          />
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-[5px] w-7 h-7 justify-center"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 7, backgroundColor: "var(--color-text)" }
                  : { rotate: 0, y: 0, backgroundColor: scrolled ? "var(--color-text)" : "#fff" }
              }
              className="block h-[1.5px] w-full rounded-full"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0 }
                  : { opacity: 1, backgroundColor: scrolled ? "var(--color-text)" : "#fff" }
              }
              className="block h-[1.5px] w-full rounded-full"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -7, backgroundColor: "var(--color-text)" }
                  : { rotate: 0, y: 0, backgroundColor: scrolled ? "var(--color-text)" : "#fff" }
              }
              className="block h-[1.5px] w-full rounded-full"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {["Design", "Technology", "Culture", "Travel"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-serif font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
