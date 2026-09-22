"use client";

import React from "react";
import { AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";

type TrapCardProps = {
  title: string;
  wrong: string;
  correct: string;
  memoryTip?: string;
};

export function TrapCard({ title, wrong, correct, memoryTip }: TrapCardProps) {
  return (
    <div className="my-5 rounded-xl border border-amber-500/30 bg-amber-500/5 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
        <AlertTriangle className="w-4 h-4" />
        <span>Bẫy hay nhầm: {title}</span>
      </div>

      <div className="p-4 space-y-3 text-xs sm:text-sm leading-relaxed">
        {/* Wrong */}
        <div className="flex items-start gap-2.5 text-danger bg-danger/5 p-2.5 rounded-lg border border-danger/10">
          <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Sai: </span>
            <span className="text-foreground/90">{wrong}</span>
          </div>
        </div>

        {/* Correct */}
        <div className="flex items-start gap-2.5 text-success bg-success/5 p-2.5 rounded-lg border border-success/10">
          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Đúng: </span>
            <span className="text-foreground/90">{correct}</span>
          </div>
        </div>

        {/* Memory tip */}
        {memoryTip && (
          <div className="flex items-start gap-2 text-muted-foreground pt-1 border-t border-amber-500/10 text-xs">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <span className="font-medium text-foreground">Mẹo nhớ: </span>
              {memoryTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
