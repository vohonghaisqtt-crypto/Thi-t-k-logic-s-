"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Bookmark,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { curriculum } from "@/data/curriculum";

export function DashboardProgressLive() {
  const { progress, isLoaded } = useProgress();

  const totalLessons = curriculum.length;
  const completedCount = isLoaded ? progress.completedLessons.length : 0;
  const bookmarkCount = isLoaded ? progress.bookmarks.length : 0;

  const knownFlashcards = isLoaded
    ? Object.values(progress.flashcardState || {}).filter((s) => s === "known").length
    : 0;

  const quizCount = isLoaded ? progress.quizHistory.length : 0;
  const avgQuizScore =
    isLoaded && quizCount > 0
      ? Math.round(
          progress.quizHistory.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizCount
        )
      : null;

  return (
    <div className="border border-border rounded-xl p-5 bg-surface flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Tiến độ học tập của bạn
        </h3>
        {isLoaded && completedCount > 0 && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
            {Math.round((completedCount / totalLessons) * 100)}%
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Completed Lessons */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Đã hoàn thành
          </span>
          <span className="font-semibold text-foreground">
            {completedCount} / {totalLessons} bài
          </span>
        </div>

        {/* Bookmarked */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Bookmark className="w-4 h-4 text-primary" />
            Đánh dấu lưu trữ
          </span>
          <span className="font-semibold text-foreground">{bookmarkCount} bài</span>
        </div>

        {/* Flashcard Mastered */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <RotateCcw className="w-4 h-4 text-purple-500" />
            Thẻ đã thuộc vững
          </span>
          <span className="font-semibold text-foreground">{knownFlashcards} thẻ</span>
        </div>

        {/* Quiz Accuracy */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Điểm Quiz TB
          </span>
          <span className="font-semibold text-foreground">
            {avgQuizScore !== null ? `${avgQuizScore}% (${quizCount} lượt)` : "Chưa làm"}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
        <Link
          href="/review"
          className="text-primary hover:underline font-medium inline-flex items-center gap-1"
        >
          Ôn Flashcard
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href="/quiz"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          Làm Quiz
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
