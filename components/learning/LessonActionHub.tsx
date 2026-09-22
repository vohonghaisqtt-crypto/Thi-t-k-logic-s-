"use client";

import React from "react";
import Link from "next/link";
import { flashcards } from "@/data/flashcards";
import { quizzes } from "@/data/quizzes";
import {
  RotateCcw,
  HelpCircle,
  AlertTriangle,
  Network,
  ArrowRight,
  Flame,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

interface LessonActionHubProps {
  lessonSlug: string;
  lessonTitle: string;
}

export function LessonActionHub({ lessonSlug, lessonTitle }: LessonActionHubProps) {
  // Đếm số lượng flashcard & quiz thuộc module này
  const moduleCards = flashcards.filter((c) => c.lessonSlug === lessonSlug);
  const moduleQuizzes = quizzes.filter((q) => q.lessonSlug === lessonSlug);

  return (
    <section
      aria-label="Khu vực luyện tập chủ động sau khi đọc"
      className="my-10 p-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-surface via-surface-muted/30 to-primary/[0.04] shadow-sm relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative z-10 space-y-4">
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-1">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Phương pháp Học chủ động (Active Recall)</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Từ Đọc Đến Nhớ Sâu — Luyện tập Module này
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Đọc xong không có nghĩa là đã nhớ. Hãy củng cố phản xạ ngay với các công cụ tương tác:
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 font-medium self-start sm:self-auto shrink-0">
            <Flame className="w-3.5 h-3.5" />
            <span>Chống quên lãng</span>
          </div>
        </div>

        {/* 4 Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Card 1: Flashcards */}
          <Link
            href={`/review?module=${lessonSlug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-surface-muted text-muted-foreground border border-border">
                  {moduleCards.length > 0 ? `${moduleCards.length} thẻ nhớ` : "Kho chung"}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Lật Flashcard 3D
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                  Kiểm tra khả năng nhớ lại công thức và khái niệm không cần nhìn gợi ý.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs font-medium text-primary">
              <span>Ôn tập ngay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Quiz */}
          <Link
            href={`/quiz?module=${lessonSlug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-surface-muted text-muted-foreground border border-border">
                  {moduleQuizzes.length > 0 ? `${moduleQuizzes.length} câu hỏi` : "Kho chung"}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  Làm Quiz Thực chiến
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                  Trắc nghiệm, phân tích mã Verilog và điền khái niệm có giải thích chi tiết.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span>Bắt đầu thi thử</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Traps */}
          <Link
            href="/traps"
            className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-surface hover:border-amber-500/50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  33 bẫy lỗi
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  33 Cạm Bẫy Thiết Kế
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                  Xem danh sách cạm bẫy hay gặp: Latch ngoài ý muốn, race condition, active-low.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs font-medium text-amber-600 dark:text-amber-400">
              <span>Xem cạm bẫy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Knowledge Map */}
          <Link
            href={`/map?highlight=${lessonSlug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Network className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-surface-muted text-muted-foreground border border-border">
                  25 Nodes tri thức
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Bản Đồ Tri Thức
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                  Định vị module này nằm ở vị trí nào trong chuỗi xương sống phần cứng.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs font-medium text-purple-600 dark:text-purple-400">
              <span>Khám phá chuỗi liên kết</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
