"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, AlertTriangle, BookMarked, ArrowRight } from "lucide-react";
import { curriculum } from "@/data/curriculum";
import { traps } from "@/data/traps";
import { glossary } from "@/data/glossary";

type SearchResult = {
  id: string;
  title: string;
  category: "Bài học" | "Bẫy hay nhầm" | "Từ điển";
  url: string;
  snippet: string;
};

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
        closeModal();
      }
    };

    const handleOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-modal", handleOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-modal", handleOpen);
    };
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const searchIndex: SearchResult[] = useMemo(() => {
    const items: SearchResult[] = [];

    // 1. Lessons
    curriculum.forEach((c) => {
      items.push({
        id: `lesson-${c.slug}`,
        title: c.title,
        category: "Bài học",
        url: `/learn/${c.slug}`,
        snippet: c.description,
      });
    });

    // 2. Traps
    traps.forEach((t) => {
      items.push({
        id: `trap-${t.id}`,
        title: t.title,
        category: "Bẫy hay nhầm",
        url: `/traps#${t.id}`,
        snippet: `Sai: ${t.wrong} | Đúng: ${t.correct}`,
      });
    });

    // 3. Glossary
    glossary.forEach((g) => {
      items.push({
        id: `glossary-${g.id}`,
        title: g.term,
        category: "Từ điển",
        url: `/glossary#${g.id}`,
        snippet: g.definition,
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, searchIndex]);

  const handleSelect = (url: string) => {
    closeModal();
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-border gap-3 h-14">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            placeholder="Tìm bài học, công thức, bẫy hay gặp, khái niệm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors"
              title="Xóa nội dung nhập"
              aria-label="Xóa nội dung nhập"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={closeModal}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-border bg-surface-muted hover:bg-surface hover:border-border/80 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Đóng tìm kiếm (Phím ESC hoặc click)"
            aria-label="Đóng tìm kiếm"
          >
            <span>ESC</span>
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="p-6 text-center text-xs text-muted-foreground space-y-2.5">
              <p className="font-medium text-foreground">Tìm kiếm tức thì trong toàn bộ tài liệu</p>
              <p className="text-muted-foreground">Bấm chọn nhanh từ khóa hoặc gõ trực tiếp:</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {["Bù 2", "DeMorgan", "Karnaugh", "Flip-Flop", "assign", "Moore", "Multiplexer", "ISE Xilinx"].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      setQuery(kw);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-md text-xs bg-surface-muted hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-border text-foreground transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              Không tìm thấy kết quả phù hợp cho "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.url)}
                  className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-surface-muted transition-colors group"
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-surface border border-border text-primary shrink-0">
                    {r.category === "Bài học" ? (
                      <BookOpen className="w-4 h-4" />
                    ) : r.category === "Bẫy hay nhầm" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <BookMarked className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {r.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded border border-border bg-surface-muted text-muted-foreground shrink-0">
                        {r.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {r.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0 self-center" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
