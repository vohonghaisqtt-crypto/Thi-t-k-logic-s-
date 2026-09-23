"use client";

import React, { useState, useEffect } from "react";
import { HeadingNode } from "@/lib/types";
import { AlignLeft, X, ChevronRight, Bookmark, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type MobileTableOfContentsProps = {
  headings: HeadingNode[];
  lessonSlug: string;
};

export function MobileTableOfContents({ headings, lessonSlug }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { progress, toggleCompleteLesson, toggleBookmark } = useProgress();

  const isCompleted = progress.completedLessons.includes(lessonSlug);
  const isBookmarked = progress.bookmarks.includes(lessonSlug);

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
        window.history.pushState({}, "", `#${id}`);
      }
    }, 150);
  };

  if (headings.length === 0) return null;

  const currentHeading = headings.find((h) => h.id === activeId) || headings[0];

  return (
    <>
      {/* Mobile Floating Action Bar for TOC (Screen < 1280px) */}
      <div className="xl:hidden fixed bottom-6 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        <div className="w-full max-w-md mx-auto pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface/95 dark:bg-surface/90 backdrop-blur-md border border-border shadow-lg text-xs font-medium text-foreground hover:bg-surface-muted transition-all active:scale-[0.98]"
            aria-label="Mở mục lục bài học"
          >
            <div className="flex items-center gap-2 truncate">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                <AlignLeft className="w-4 h-4" />
              </div>
              <span className="truncate text-muted-foreground">
                <span className="text-foreground font-semibold">Mục lục: </span>
                {currentHeading?.text || "Xem các phần"}
              </span>
            </div>
            <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-surface-muted border border-border text-muted-foreground font-mono">
              {headings.length} mục
            </span>
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mục lục bài học di động"
            className="relative w-full max-h-[80vh] bg-surface rounded-t-3xl border-t border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 rounded-full bg-border mx-auto my-2.5 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-border/80">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Mục lục bài học
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  ({headings.length})
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Đóng mục lục"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 p-4 bg-surface-muted/30 border-b border-border/60">
              <button
                onClick={() => toggleCompleteLesson(lessonSlug)}
                type="button"
                className={cn(
                  "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                  isCompleted
                    ? "bg-success/15 border-success/30 text-success"
                    : "bg-surface border-border text-foreground hover:bg-surface-muted"
                )}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isCompleted ? "Đã xong" : "Đánh dấu xong"}</span>
              </button>
              <button
                onClick={() => toggleBookmark(lessonSlug)}
                type="button"
                className={cn(
                  "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                  isBookmarked
                    ? "bg-primary/15 border-primary/30 text-primary"
                    : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                )}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBookmarked ? "Đã lưu" : "Lưu bài"}</span>
              </button>
            </div>

            {/* Headings List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 divide-y divide-border/20">
              {headings.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => handleScrollTo(h.id)}
                    className={cn(
                      "w-full flex items-center justify-between text-left py-2.5 px-3 rounded-xl transition-colors text-xs leading-snug",
                      h.level === 3 ? "pl-6 text-[11px]" : "font-medium",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                        : "text-foreground/80 hover:bg-surface-muted"
                    )}
                  >
                    <span className="truncate pr-2">{h.text}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
