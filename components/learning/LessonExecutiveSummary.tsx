import React from "react";
import { Lesson } from "@/lib/types";
import { Sparkles, Target, CheckCircle2, Clock, Lightbulb } from "lucide-react";

interface LessonExecutiveSummaryProps {
  lesson: Lesson;
}

export function LessonExecutiveSummary({ lesson }: LessonExecutiveSummaryProps) {
  if (!lesson.objectives || lesson.objectives.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Tóm tắt cốt lõi 60 giây và mục tiêu bài học"
      className="my-6 p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-surface to-surface shadow-sm relative overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      <div className="relative z-10 space-y-3.5">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Khung tư duy 60s & Mục tiêu cốt lõi</span>
          </div>

          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>~{lesson.estimatedMinutes} phút làm chủ</span>
          </span>
        </div>

        {/* Short Concept Anchor */}
        <div className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed font-medium">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            {lesson.description}
          </p>
        </div>

        {/* 3 Key Objectives */}
        <div className="pt-2 border-t border-border/70 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span>Sau khi hoàn tất bài này, bạn cần đạt được:</span>
          </p>
          <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-foreground/90">
            {lesson.objectives.map((obj, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-lg bg-surface/60 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
