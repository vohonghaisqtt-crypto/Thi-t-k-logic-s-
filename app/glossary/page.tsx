"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { glossary } from "@/data/glossary";
import { curriculum } from "@/data/curriculum";
import {
  BookMarked,
  Search,
  X,
  ArrowRight,
  Hash,
  Check,
  Tag,
  Filter,
  Layers,
  Sparkles,
} from "lucide-react";
import { FormulaCard } from "@/components/markdown/FormulaCard";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    glossary.forEach((item) => set.add(item.category));
    return ["all", ...Array.from(set)];
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return glossary.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.formula && item.formula.toLowerCase().includes(q)) ||
        (item.related && item.related.some((r) => r.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  // Support direct hash scrolling on load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    }
  }, []);

  const handleCopyLink = (id: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/glossary#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLessonTitle = (slug: string) => {
    const lesson = curriculum.find((c) => c.slug === slug);
    return lesson ? lesson.title : "Bài học liên quan";
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="border-b border-border pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Tra cứu nhanh {glossary.length} thuật ngữ
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
          <BookMarked className="w-7 h-7 text-primary" />
          Từ điển Khái niệm Cốt lõi
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Định nghĩa chuẩn xác, công thức và liên kết bài học của các thuật ngữ nền tảng: Hệ đếm, Boole, Karnaugh, Mạch tổ hợp, Tuần tự, Verilog HDL và FSM.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-surface shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên thuật ngữ, định nghĩa, công thức hoặc khái niệm liên quan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-surface-muted/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Xóa từ khóa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-muted-foreground mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-medium">Chủ đề:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-surface-muted/80 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Hiển thị <strong className="text-foreground">{filteredItems.length}</strong> / {glossary.length} thuật ngữ
        </span>
        {(searchQuery || selectedCategory !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-primary hover:underline font-medium"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Glossary Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="border border-border rounded-2xl p-12 bg-surface text-center space-y-2">
          <p className="font-semibold text-foreground">Không tìm thấy thuật ngữ phù hợp</p>
          <p className="text-xs text-muted-foreground">
            Hãy thử tìm với từ khóa khác như "Boole", "Bù 2", "MUX", "Flip-Flop", "always"...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="group border border-border bg-surface hover:bg-surface-muted/50 hover:border-primary/40 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm scroll-mt-24 target:ring-2 target:ring-primary target:border-primary"
            >
              <div className="space-y-3">
                {/* Card Top: Term + Category + Copy Link */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-1.5 leading-snug group-hover:text-primary transition-colors">
                      {item.term}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopyLink(item.id)}
                    type="button"
                    className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors shrink-0"
                    title="Sao chép liên kết đến thuật ngữ này"
                    aria-label={`Sao chép liên kết mục ${item.term}`}
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <Hash className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {item.definition}
                </p>

                {/* Formula if present */}
                {item.formula && (
                  <div className="pt-1">
                    <FormulaCard
                      formula={item.formula}
                      label="Biểu thức logic"
                      copyable={true}
                    />
                  </div>
                )}

                {/* Related concepts */}
                {item.related && item.related.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-muted-foreground">
                    <Tag className="w-3 h-3 text-primary shrink-0" />
                    <span>Liên quan:</span>
                    {item.related.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSearchQuery(r)}
                        className="px-2 py-0.5 rounded-md bg-surface-muted border border-border text-foreground hover:text-primary transition-colors text-[10px]"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Link to corresponding lesson */}
              <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                  {getLessonTitle(item.lessonSlug)}
                </span>
                <Link
                  href={`/learn/${item.lessonSlug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline shrink-0"
                >
                  <span>Học bài này</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
