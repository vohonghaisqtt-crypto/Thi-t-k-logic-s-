"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  GitPullRequest,
  Sparkles,
  Layers,
  Filter,
} from "lucide-react";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

export default function LearnIndexPage() {
  const { progress } = useProgress();
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "uncompleted">("all");

  // Calculate progress stats
  const totalLessons = curriculum.length;
  const completedCount = progress.completedLessons.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  // Group by category (4 Pillars)
  const categories = useMemo(() => {
    const cats: Record<string, typeof curriculum> = {
      "Nền tảng biểu diễn thông tin": [],
      "Thiết kế mạch số": [],
      "Chuyển mạch số thành HDL": [],
      "Kiểm chứng mô phỏng": [],
    };

    curriculum.forEach((item) => {
      if (!cats[item.category]) {
        cats[item.category] = [];
      }
      cats[item.category].push(item);
    });

    return cats;
  }, []);

  // Filter lessons
  const filteredCurriculum = useMemo(() => {
    if (activeFilter === "completed") {
      return curriculum.filter((m) => progress.completedLessons.includes(m.slug));
    }
    if (activeFilter === "uncompleted") {
      return curriculum.filter((m) => !progress.completedLessons.includes(m.slug));
    }
    return curriculum;
  }, [activeFilter, progress.completedLessons]);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="border-b border-border pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Lộ trình học tập chuẩn 18 - 20 giờ
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Học theo Chương trình
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          11 Module học tập từ nền tảng số nhị phân đến thiết kế vi mạch FSM và mô phỏng trên ISE Xilinx 14.7.
        </p>
      </div>

      {/* Progress & Overview Card */}
      <div className="border border-border rounded-2xl p-6 bg-surface space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tiến độ học tập cá nhân
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-foreground">
                {completedCount} / {totalLessons}
              </span>
              <span className="text-xs text-muted-foreground">bài học đã hoàn thành</span>
              <span className="text-xs font-bold text-primary ml-2">({percentage}%)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-surface-muted px-3 py-1.5 rounded-xl border border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span>Tổng thời lượng: <strong className="text-foreground font-semibold">18 giờ học</strong></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-surface-muted rounded-full overflow-hidden border border-border/80">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>

        {/* Filter buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-border flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả ({curriculum.length})
            </button>
            <button
              onClick={() => setActiveFilter("uncompleted")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === "uncompleted"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Chưa học ({curriculum.length - completedCount})
            </button>
            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Đã xong ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Grouped Lessons by 4 Pillars */}
      {activeFilter === "all" ? (
        <div className="space-y-8">
          {Object.entries(categories).map(([pillarName, modules]) => (
            <div key={pillarName} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Layers className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold text-foreground uppercase tracking-wider text-xs">
                  {pillarName} ({modules.length} bài)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((m) => renderLessonCard(m, progress.completedLessons))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCurriculum.map((m) => renderLessonCard(m, progress.completedLessons))}
        </div>
      )}
    </div>
  );
}

function renderLessonCard(m: (typeof curriculum)[0], completedSlugs: string[]) {
  const isCompleted = completedSlugs.includes(m.slug);

  return (
    <Link
      key={m.slug}
      href={`/learn/${m.slug}`}
      className="group border border-border bg-surface hover:bg-surface-muted hover:border-primary/40 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {m.estimatedMinutes} phút
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
              isCompleted
                ? "bg-success/10 text-success border-success/30"
                : "bg-surface-muted text-muted-foreground border-border"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã hoàn thành</span>
              </>
            ) : (
              <>
                <Circle className="w-3 h-3" />
                <span>Chưa học</span>
              </>
            )}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {m.order < 10 ? `0${m.order}` : m.order}. {m.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
            {m.description}
          </p>
        </div>

        {/* Prerequisites pills */}
        {m.prerequisites.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
            <GitPullRequest className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="text-[10px]">Cần biết:</span>
            {m.prerequisites.map((p) => (
              <span
                key={p}
                className="px-1.5 py-0.2 rounded bg-surface-muted border border-border font-mono text-[10px]"
              >
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
        <span>Vào bài học</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
