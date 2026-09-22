import React, { Suspense } from "react";
import { RotateCcw, Sparkles, BookOpen, Layers } from "lucide-react";
import { flashcards } from "@/data/flashcards";
import { FlashcardDeck } from "@/components/review/FlashcardDeck";

export const metadata = {
  title: "Ôn tập Flashcards 3D | Logic Số & Verilog HDL",
  description:
    "Hệ thống thẻ ghi nhớ chủ động (Active Recall) 3D bao gồm công thức, khái niệm, bẫy lỗi và cú pháp Verilog.",
};

export default function ReviewPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Section */}
      <div className="border-b border-border pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              Active Recall System
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <RotateCcw className="w-7 h-7 text-primary" />
              Ôn tập Flashcards 3D
            </h1>
            <p className="text-sm text-muted-foreground">
              Kho 38 thẻ ghi nhớ cốt lõi: Công thức Boole, kiến trúc MUX/FSM, bẫy HDL và vi mạch số.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-surface px-3 py-1.5 rounded-lg border border-border">
            <Layers className="w-4 h-4 text-primary" />
            <span>Tổng cộng: <strong className="text-foreground">{flashcards.length} thẻ</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Deck Component wrapped in Suspense for Netlify SSG compatibility */}
      <Suspense
        fallback={
          <div className="p-12 text-center rounded-2xl border border-border bg-surface text-muted-foreground animate-pulse text-sm">
            Đang tải bộ Flashcard 3D...
          </div>
        }
      >
        <FlashcardDeck cards={flashcards} />
      </Suspense>
    </div>
  );
}

