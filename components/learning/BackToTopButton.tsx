"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className={cn(
        "fixed bottom-20 xl:bottom-6 right-6 z-40 p-2.5 rounded-full bg-surface/90 dark:bg-surface/80 backdrop-blur-md border border-border shadow-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-all active:scale-95 animate-in fade-in zoom-in-75 duration-200"
      )}
      aria-label="Cuộn lên đầu trang"
      title="Lên đầu trang"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
