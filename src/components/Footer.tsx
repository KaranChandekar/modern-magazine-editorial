"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Magazine: ["About", "Contact", "Careers", "Advertise"],
  Topics: ["Design", "Technology", "Culture", "Travel", "Fashion", "Architecture"],
  Follow: ["Twitter", "Instagram", "LinkedIn", "RSS"],
};

const stagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  },
};

export default function Footer() {
  return (
    <footer
      className="pt-20 pb-10"
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-baseline gap-1.5 mb-5"
            >
              <span
                className="font-serif text-2xl font-bold tracking-tight"
                style={{ color: "var(--color-accent)" }}
              >
                VOGUE
              </span>
              <span
                className="font-sans font-light text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "var(--color-text-muted)" }}
              >
                Editorial
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              A modern digital magazine exploring design, technology, culture,
              and the spaces in between.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div
              key={title}
              variants={stagger.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4
                className="font-semibold text-[11px] uppercase tracking-[0.15em] mb-5"
                style={{ color: "var(--color-text)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li key={link} variants={stagger.item}>
                    <Link
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--color-text-muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-text-muted)")
                      }
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="text-[11px] tracking-wide"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {new Date().getFullYear()} VOGUE Editorial. All rights
            reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
