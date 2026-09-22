import React, { Suspense } from "react";
import { HelpCircle, Award, BookOpen, Layers } from "lucide-react";
import { quizzes } from "@/data/quizzes";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

export const metadata = {
  title: "Luyện tập Trắc nghiệm (Quiz) | Logic Số & Verilog HDL",
  description:
    "Hệ thống kiểm tra kiến thức đa dạng: Trắc nghiệm 4 lựa chọn, Đúng/Sai, Đọc hiểu mã Verilog và Điền từ có giải thích cặn kẽ.",
};

export default function QuizPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Section */}
      <div className="border-b border-border pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Award className="w-3.5 h-3.5" />
              Đánh giá & Củng cố
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-primary" />
              Luyện tập Đánh giá (Quiz)
            </h1>
            <p className="text-sm text-muted-foreground">
              Bộ câu hỏi kiểm định kiến thức: MCQ, True/False, Đọc hiểu mã Verilog và Điền khái niệm có giải thích chi tiết.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-surface px-3 py-1.5 rounded-lg border border-border">
            <Layers className="w-4 h-4 text-primary" />
            <span>Ngân hàng: <strong className="text-foreground">{quizzes.length} câu hỏi</strong></span>
          </div>
        </div>
      </div>

      {/* Quiz Interactive Player wrapped in Suspense for Netlify SSG */}
      <Suspense
        fallback={
          <div className="p-12 text-center rounded-2xl border border-border bg-surface text-muted-foreground animate-pulse text-sm">
            Đang tải dữ liệu bài kiểm tra...
          </div>
        }
      >
        <QuizPlayer questions={quizzes} />
      </Suspense>
    </div>
  );
}

