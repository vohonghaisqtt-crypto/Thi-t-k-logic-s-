"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Sparkles,
  Lightbulb,
  ExternalLink,
  Flame,
  Check,
} from "lucide-react";
import { FlashcardItem } from "@/lib/types";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

interface FlashcardDeckProps {
  cards: FlashcardItem[];
}

export function FlashcardDeck({ cards: initialCards }: FlashcardDeckProps) {
  const { progress, setFlashcardStatus, isLoaded } = useProgress();
  const searchParams = useSearchParams();
  const moduleParam = searchParams?.get("module");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedModule, setSelectedModule] = useState<string>(moduleParam || "all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffledCards, setShuffledCards] = useState<FlashcardItem[]>(initialCards);
  const [showTip, setShowTip] = useState<boolean>(false);

  useEffect(() => {
    if (moduleParam) {
      setSelectedModule(moduleParam);
    }
  }, [moduleParam]);


  // Lọc thẻ
  const filteredCards = useMemo(() => {
    return shuffledCards.filter((card) => {
      // Lọc category
      if (selectedCategory !== "all" && card.category !== selectedCategory) {
        return false;
      }
      // Lọc module
      if (selectedModule !== "all" && card.lessonSlug !== selectedModule) {
        return false;
      }
      // Lọc status
      if (selectedStatus !== "all") {
        const state = progress.flashcardState[card.id] || "new";
        if (state !== selectedStatus) return false;
      }
      return true;
    });
  }, [shuffledCards, selectedCategory, selectedModule, selectedStatus, progress.flashcardState]);

  // Reset index khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowTip(false);
  }, [selectedCategory, selectedModule, selectedStatus]);

  const currentCard = filteredCards[currentIndex];

  const currentCardStatus = useMemo(() => {
    if (!currentCard) return "new";
    return progress.flashcardState[currentCard.id] || "new";
  }, [currentCard, progress.flashcardState]);

  // Thống kê tổng quan thẻ
  const stats = useMemo(() => {
    const states = initialCards.map((c) => progress.flashcardState[c.id] || "new");
    const known = states.filter((s) => s === "known").length;
    const learning = states.filter((s) => s === "learning").length;
    const unremembered = states.filter((s) => s === "new").length;
    const rate = Math.round((known / initialCards.length) * 100);
    return { known, learning, unremembered, rate };
  }, [initialCards, progress.flashcardState]);

  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setShowTip(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setShowTip(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRate = useCallback(
    (status: "new" | "learning" | "known") => {
      if (!currentCard) return;
      setFlashcardStatus(currentCard.id, status);
      // Tự động chuyển thẻ sau khi đánh giá
      setTimeout(() => {
        handleNext();
      }, 250);
    },
    [currentCard, setFlashcardStatus, handleNext]
  );

  const handleShuffle = () => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowTip(false);
  };

  const handleResetDeck = () => {
    setShuffledCards(initialCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowTip(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Không bắt phím nếu đang gõ trong input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        e.preventDefault();
        handleRate("new");
      } else if (e.key === "2") {
        e.preventDefault();
        handleRate("learning");
      } else if (e.key === "3") {
        e.preventDefault();
        handleRate("known");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleRate]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "formula":
        return { label: "Công thức", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
      case "concept":
        return { label: "Khái niệm", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" };
      case "trap":
        return { label: "Bẫy hay nhầm", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "verilog":
        return { label: "Verilog HDL", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
      default:
        return { label: "Chung", color: "bg-muted text-muted-foreground border-border" };
    }
  };

  const currentModule = curriculum.find((m) => m.slug === currentCard?.lessonSlug);

  return (
    <div className="space-y-6">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-border bg-surface">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Độ thuộc vững
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.rate}%</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Đã nhớ
          </div>
          <div className="text-2xl font-bold text-emerald-500">{stats.known} thẻ</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Tạm nhớ
          </div>
          <div className="text-2xl font-bold text-amber-500">{stats.learning} thẻ</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            Chưa nhớ
          </div>
          <div className="text-2xl font-bold text-rose-500">{stats.unremembered} thẻ</div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-surface border border-border text-xs font-medium">
          {[
            { id: "all", label: "Tất cả" },
            { id: "formula", label: "Công thức" },
            { id: "concept", label: "Khái niệm" },
            { id: "trap", label: "Bẫy" },
            { id: "verilog", label: "Verilog" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Module & Status Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">Tất cả bài học (11)</option>
            {curriculum.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.order}. {m.title}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">Mọi trạng thái</option>
            <option value="new">Chưa nhớ</option>
            <option value="learning">Tạm nhớ</option>
            <option value="known">Đã nhớ</option>
          </select>

          <button
            onClick={handleShuffle}
            title="Đảo ngẫu nhiên các thẻ"
            className="p-1.5 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Flashcard View */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="space-y-4">
          {/* Card Counter & Progress */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                Thẻ {currentIndex + 1} / {filteredCards.length}
              </span>
              <span>•</span>
              <span className="text-muted-foreground">
                {currentModule ? currentModule.title : "Tất cả"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentCardStatus === "known" && (
                <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                  <Check className="w-3.5 h-3.5" /> Đã nhớ
                </span>
              )}
              {currentCardStatus === "learning" && (
                <span className="inline-flex items-center gap-1 text-amber-500 font-medium">
                  <Flame className="w-3.5 h-3.5" /> Đang ôn
                </span>
              )}
              {currentCardStatus === "new" && (
                <span className="text-muted-foreground">Mới</span>
              )}
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={handleFlip}
            className="relative w-full min-h-[360px] sm:min-h-[400px] cursor-pointer select-none group"
            style={{ perspective: "1200px" }}
          >
            <div
              className={`w-full h-full min-h-[360px] sm:min-h-[400px] transition-transform duration-500 rounded-2xl border border-border bg-surface shadow-md relative ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT FACE */}
              <div
                className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between rounded-2xl bg-surface"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Header of Front */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${
                        getCategoryBadge(currentCard.category).color
                      }`}
                    >
                      {getCategoryBadge(currentCard.category).label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                      {currentModule?.title}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-muted-foreground">
                    #{currentIndex + 1}
                  </span>
                </div>

                {/* Question Prompt */}
                <div className="my-auto py-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-relaxed whitespace-pre-line">
                    {currentCard.front}
                  </h3>
                </div>

                {/* Footer of Front */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  {currentCard.tip && (
                    <div>
                      {showTip ? (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{currentCard.tip}</span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTip(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-500 transition-colors"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Xem gợi ý ôn tập</span>
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="italic flex items-center gap-1">
                      <RotateCcw className="w-3 h-3 text-primary animate-pulse" />
                      Nhấn vào thẻ hoặc nhấn <kbd className="px-1.5 py-0.5 rounded bg-surface-muted border border-border text-[10px]">Space</kbd> để lật
                    </span>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      Dùng phím <kbd className="px-1 py-0.5 rounded bg-surface-muted border border-border text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-surface-muted border border-border text-[10px]">→</kbd> đổi thẻ
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK FACE */}
              <div
                className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between rounded-2xl bg-surface-muted/70 border border-primary/20"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Header of Back */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đáp án & Giải thích
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                      {currentModule?.title}
                    </span>
                  </div>

                  <Link
                    href={`/learn/${currentCard.lessonSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Xem bài học</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Back Answer Content */}
                <div className="my-auto py-6 overflow-y-auto max-h-[260px]">
                  <div className="text-base sm:text-lg font-medium text-foreground whitespace-pre-line leading-relaxed bg-surface p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                    {currentCard.back}
                  </div>
                </div>

                {/* Footer of Back */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/60">
                  <span className="italic">
                    Chọn mức độ nhớ bên dưới để tự động chuyển thẻ tiếp theo
                  </span>
                  <span className="font-mono text-[11px]">
                    Phím <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-[10px]">1</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-[10px]">2</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-[10px]">3</kbd>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action & Assessment Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Left: Prev / Flip / Next */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={handlePrev}
                title="Thẻ trước (Phím ←)"
                className="p-2.5 rounded-xl border border-border bg-surface text-foreground hover:bg-surface-muted transition-colors flex items-center justify-center shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleFlip}
                className="px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground hover:bg-surface-muted transition-colors font-medium text-sm flex items-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-4 h-4 text-primary" />
                <span>{isFlipped ? "Xem mặt câu hỏi" : "Lật xem đáp án"}</span>
              </button>
              <button
                onClick={handleNext}
                title="Thẻ sau (Phím →)"
                className="p-2.5 rounded-xl border border-border bg-surface text-foreground hover:bg-surface-muted transition-colors flex items-center justify-center shadow-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: 3 Assessment Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => handleRate("new")}
                className={`flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  currentCardStatus === "new"
                    ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-600 flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                <span>Chưa nhớ</span>
              </button>

              <button
                onClick={() => handleRate("learning")}
                className={`flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  currentCardStatus === "learning"
                    ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <span>Tạm nhớ</span>
              </button>

              <button
                onClick={() => handleRate("known")}
                className={`flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  currentCardStatus === "known"
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                <span>Đã nhớ</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="border border-dashed border-border rounded-2xl p-12 text-center bg-surface space-y-4">
          <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Không có thẻ flashcard nào phù hợp
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Không tìm thấy thẻ nào theo bộ lọc chuyên mục hoặc trạng thái đang chọn.
            </p>
          </div>
          <button
            onClick={handleResetDeck}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      )}
    </div>
  );
}
