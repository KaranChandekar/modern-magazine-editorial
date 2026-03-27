"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;

    const handleScroll = () => {
      raf = requestAnimationFrame(() => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setProgress((window.scrollY / docHeight) * 100);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
