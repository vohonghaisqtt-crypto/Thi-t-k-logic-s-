"use client";

import React, { useEffect, useState } from "react";
import { HeadingNode } from "@/lib/types";
import { Bookmark, CheckCircle, AlignLeft } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: HeadingNode[];
  lessonSlug: string;
};

export function TableOfContents({ headings, lessonSlug }: TableOfContentsProps) {
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

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      window.history.pushState({}, "", `#${id}`);
    }
  };

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pl-4 border-l border-border/60">
      <div className="space-y-4">
        {/* Quick Action Buttons */}
        <div className="space-y-2 pb-4 border-b border-border/80">
          <button
            onClick={() => toggleCompleteLesson(lessonSlug)}
            type="button"
            className={cn(
              "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
              isCompleted
                ? "bg-success/15 border-success/30 text-success"
                : "bg-surface border-border text-foreground hover:bg-surface-muted"
            )}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? "Đã hoàn thành bài" : "Đánh dấu đã học"}</span>
          </button>

          <button
            onClick={() => toggleBookmark(lessonSlug)}
            type="button"
            className={cn(
              "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
              isBookmarked
                ? "bg-primary/15 border-primary/30 text-primary"
                : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
            )}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isBookmarked ? "Đã lưu vào Bookmark" : "Lưu vào Bookmark"}</span>
          </button>
        </div>

        {/* TOC List */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
            <AlignLeft className="w-3.5 h-3.5 text-primary" />
            <span>Mục lục trang này</span>
          </div>

          {headings.length === 0 ? (
            <p className="text-xs text-muted-foreground">Không có mục phụ</p>
          ) : (
            <nav className="space-y-1" aria-label="Mục lục đề mục">
              {headings.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => handleScrollTo(h.id)}
                    className={cn(
                      "w-full text-left block py-1 text-xs transition-colors rounded-md truncate",
                      h.level === 3 ? "pl-3 text-[11px]" : "pl-1 font-medium",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    title={h.text}
                  >
                    {h.text}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
}
