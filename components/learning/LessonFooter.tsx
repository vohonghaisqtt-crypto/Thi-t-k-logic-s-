"use client";

import React from "react";
import Link from "next/link";
import { Lesson } from "@/lib/types";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

type LessonFooterProps = {
  currentLesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
};

export function LessonFooter({
  currentLesson,
  prevLesson,
  nextLesson,
}: LessonFooterProps) {
  const { progress, toggleCompleteLesson } = useProgress();
  const isCompleted = progress.completedLessons.includes(currentLesson.slug);

  return (
    <footer className="mt-12 pt-6 border-t border-border space-y-6">
      {/* Complete confirmation bar */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-muted/50">
        <div>
          <p className="text-xs font-semibold text-foreground">
            {isCompleted ? "Bạn đã hoàn thành bài học này!" : "Đã hiểu bài học này?"}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Lưu lại tiến trình để theo dõi trong Bản đồ và Cài đặt
          </p>
        </div>
        <button
          onClick={() => toggleCompleteLesson(currentLesson.slug)}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            isCompleted
              ? "bg-success text-white border-success"
              : "bg-surface text-foreground border-border hover:bg-surface-muted"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? "Đã hoàn thành ✓" : "Đánh dấu hoàn thành"}</span>
        </button>
      </div>

      {/* Navigation Buttons: Previous / Next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.slug}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:bg-surface-muted transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            <div className="min-w-0">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                BÀI TRƯỚC
              </span>
              <p className="text-xs font-semibold text-foreground truncate">
                {prevLesson.title}
              </p>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.slug}`}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:bg-surface-muted transition-colors group sm:text-right"
          >
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                BÀI TIẾP THEO
              </span>
              <p className="text-xs font-semibold text-foreground truncate">
                {nextLesson.title}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
        ) : (
          <Link
            href="/review"
            className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/15 transition-colors group sm:text-right"
          >
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold tracking-wider text-primary">
                HOÀN TẤT GIÁO TRÌNH
              </span>
              <p className="text-xs font-semibold text-primary truncate">
                Chuyển sang Ôn tập Flashcard →
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
        )}

      </div>
    </footer>
  );
}
