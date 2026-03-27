"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="py-24 px-6">
      <div
        className="max-w-2xl mx-auto text-center rounded-3xl p-10 md:p-16 relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-card-bg)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Decorative accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-b-full"
          style={{ backgroundColor: "var(--color-accent)" }}
        />

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
          style={{ color: "var(--color-accent)" }}
        >
          Newsletter
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Stay in the Loop
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Get the best stories delivered to your inbox every week.
          <br />
          No spam, unsubscribe anytime.
        </motion.p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 py-3.5 rounded-full border-2 bg-transparent text-sm focus:outline-none transition-all duration-500"
            style={{
              borderColor:
                status === "success" ? "#10b981" : "var(--color-border)",
              color: "var(--color-text)",
            }}
            aria-label="Email address"
          />

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="px-7 py-3.5 rounded-full text-white font-semibold text-sm uppercase tracking-[0.1em] flex items-center justify-center min-w-[140px]"
            style={{ backgroundColor: "var(--color-accent)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  Subscribe
                </motion.span>
              )}
              {status === "loading" && (
                <motion.span
                  key="spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
              )}
              {status === "success" && (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-lg"
                >
                  &#10003; Done
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <AnimatePresence>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-sm font-medium"
              style={{ color: "#10b981" }}
            >
              Welcome aboard! Check your inbox for a confirmation.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
