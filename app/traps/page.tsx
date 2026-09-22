"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { traps } from "@/data/traps";
import { curriculum } from "@/data/curriculum";
import {
  AlertTriangle,
  Search,
  X,
  XCircle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Hash,
  Check,
  Flame,
  Filter,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [expandedMobileIds, setExpandedMobileIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    traps.forEach((t) => set.add(t.category));
    return ["all", ...Array.from(set)];
  }, []);

  // Filter traps
  const filteredTraps = useMemo(() => {
    return traps.filter((t) => {
      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;

      const matchesPriority = !priorityOnly || t.priority === "high";

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.wrong.toLowerCase().includes(q) ||
        t.correct.toLowerCase().includes(q) ||
        (t.memoryTip && t.memoryTip.toLowerCase().includes(q));

      return matchesCategory && matchesPriority && matchesQuery;
    });
  }, [searchQuery, selectedCategory, priorityOnly]);

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
    const url = `${window.location.origin}/traps#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleMobileAccordion = (id: string) => {
    setExpandedMobileIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            Tổng hợp {traps.length} cạm bẫy kinh điển
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
          <AlertTriangle className="w-7 h-7 text-amber-500" />
          Bẫy hay Nhầm lẫn trong Thiết kế Số
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Đúc kết các lỗi sai mất điểm phổ biến nhất: BCD vs Binary, Moore vs Mealy, wire vs reg, blocking (=) vs non-blocking (&lt;=), và testbench.
        </p>
      </div>

      {/* Controller & Filter Bar */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-surface shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo lỗi sai, cách nhớ đúng hoặc mẹo nhớ..."
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

        {/* Priority and Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
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

          {/* High Priority Quick Toggle */}
          <button
            type="button"
            onClick={() => setPriorityOnly(!priorityOnly)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all",
              priorityOnly
                ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                : "bg-surface-muted border-border text-muted-foreground hover:text-foreground hover:border-amber-500/40"
            )}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Bẫy quan trọng nhất</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Hiển thị <strong className="text-foreground">{filteredTraps.length}</strong> / {traps.length} bẫy
        </span>
        {(searchQuery || selectedCategory !== "all" || priorityOnly) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setPriorityOnly(false);
            }}
            className="text-primary hover:underline font-medium"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Traps List: Responsive Desktop Grid & Mobile Accordion */}
      {filteredTraps.length === 0 ? (
        <div className="border border-border rounded-2xl p-12 bg-surface text-center space-y-2">
          <p className="font-semibold text-foreground">Không tìm thấy bẫy nào phù hợp</p>
          <p className="text-xs text-muted-foreground">
            Hãy thử tìm với từ khóa khác như "Moore", "wire", "reg", "assign", "carry"...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTraps.map((item) => {
            const isMobileOpen = expandedMobileIds[item.id] !== false; // default open or toggle

            return (
              <div
                key={item.id}
                id={item.id}
                className="border border-border bg-surface rounded-2xl overflow-hidden shadow-sm hover:border-amber-500/40 transition-all scroll-mt-24 target:ring-2 target:ring-amber-500 target:border-amber-500"
              >
                {/* Trap Card Header Bar */}
                <div
                  className="flex items-center justify-between p-4 sm:p-5 bg-surface cursor-pointer select-none"
                  onClick={() => toggleMobileAccordion(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground bg-surface-muted px-2 py-0.2 rounded border border-border">
                          {item.category}
                        </span>
                        {item.priority === "high" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded border border-amber-500/20">
                            <Flame className="w-3 h-3" />
                            Ưu tiên cao
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(item.id);
                      }}
                      type="button"
                      className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors"
                      title="Sao chép liên kết bẫy này"
                      aria-label="Sao chép liên kết"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <Hash className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform sm:hidden",
                        isMobileOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </div>

                {/* Trap Content Body */}
                <div
                  className={cn(
                    "p-4 sm:p-5 pt-0 sm:pt-0 space-y-3 sm:block",
                    isMobileOpen ? "block" : "hidden sm:block"
                  )}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {/* Wrong Box */}
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-danger/5 border border-danger/20 text-danger">
                      <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block mb-0.5">Dễ nhầm (Sai):</span>
                        <p className="text-foreground/90 leading-relaxed">{item.wrong}</p>
                      </div>
                    </div>

                    {/* Correct Box */}
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-success/5 border border-success/20 text-success">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block mb-0.5">Hiểu đúng:</span>
                        <p className="text-foreground/90 leading-relaxed">{item.correct}</p>
                      </div>
                    </div>
                  </div>

                  {/* Memory tip */}
                  {item.memoryTip && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <p className="text-foreground">
                        <strong className="text-amber-600 dark:text-amber-400 font-semibold">Mẹo nhớ nhanh: </strong>
                        {item.memoryTip}
                      </p>
                    </div>
                  )}

                  {/* Bottom link to lesson */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground truncate">
                      Nằm trong: {getLessonTitle(item.lessonSlug)}
                    </span>
                    <Link
                      href={`/learn/${item.lessonSlug}`}
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline shrink-0"
                    >
                      <span>Vào bài học</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
