"use client";

import React, { useState, useEffect } from "react";

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const percent = Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100));
        setCompletion(percent);
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Tiến trình đọc bài học"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
