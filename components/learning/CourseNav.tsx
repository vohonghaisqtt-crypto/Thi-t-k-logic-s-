"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export function CourseNav({ currentSlug }: { currentSlug: string }) {
  const { progress } = useProgress();

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pr-3">
      <div className="space-y-1 mb-4">
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground">
          CHƯƠNG TRÌNH HỌC
        </h3>

        <p className="text-[11px] text-muted-foreground">
          11 bài học cốt lõi
        </p>
      </div>

      <nav className="space-y-1" aria-label="Mục lục bài học">
        {curriculum.map((item) => {
          const isActive = item.slug === currentSlug;
          const isCompleted = progress.completedLessons.includes(item.slug);

          return (
            <Link
              key={item.slug}
              href={`/learn/${item.slug}`}
              className={cn(
                "group flex items-start gap-2.5 p-2.5 rounded-xl text-xs transition-all border",
                isActive
                  ? "bg-primary/10 border-primary/30 text-primary font-semibold shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Circle
                    className={cn(
                      "w-3.5 h-3.5",
                      isActive ? "text-primary" : "text-muted-foreground/50"
                    )}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="truncate leading-tight">
                  {item.order < 10 ? `0${item.order}` : item.order}. {item.title}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {item.estimatedMinutes}m
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
