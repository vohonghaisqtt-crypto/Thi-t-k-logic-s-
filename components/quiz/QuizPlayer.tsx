"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Clock,
  ExternalLink,
  Check,
  X,
  Code,
  ListFilter,
  FileCheck,
  ChevronRight,
  Flame,
} from "lucide-react";
import { QuizQuestion } from "@/lib/types";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

interface QuizPlayerProps {
  questions: QuizQuestion[];
}

export function QuizPlayer({ questions }: QuizPlayerProps) {
  const { recordQuizResult } = useProgress();
  const searchParams = useSearchParams();
  const moduleParam = searchParams?.get("module");

  // Mode: "practice" (ôn theo module, xem đáp án tức thì) | "exam" (thi tính giờ, nộp bài tổng kết)
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [selectedModule, setSelectedModule] = useState<string>(moduleParam || "all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    if (moduleParam) {
      setSelectedModule(moduleParam);
      setMode("practice");
    }
  }, [moduleParam]);


  // State bài làm
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<Record<string, boolean>>({});
  const [fillInputs, setFillInputs] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "wrong" | "correct">("all");
  const [examTimeSeconds, setExamTimeSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Danh sách câu hỏi hiển thị đồng bộ qua useMemo
  const activeQuestions = useMemo(() => {
    if (mode === "exam") {
      return examQuestions;
    }
    return questions.filter((q) => {
      if (selectedModule !== "all" && q.lessonSlug !== selectedModule) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [questions, mode, examQuestions, selectedModule, selectedDifficulty]);

  const resetState = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsAnswerRevealed({});
    setFillInputs({});
    setIsSubmitted(false);
  }, []);

  const handleSwitchMode = (newMode: "practice" | "exam") => {
    setMode(newMode);
    resetState();
    if (newMode === "exam") {
      const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 15);
      setExamQuestions(shuffled);
      setExamTimeSeconds(0);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  };

  const handleResetQuiz = () => {
    resetState();
    if (mode === "exam") {
      const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 15);
      setExamQuestions(shuffled);
      setExamTimeSeconds(0);
      setIsTimerRunning(true);
    }
  };

  // Đồng hồ tính giờ trong chế độ Exam
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setExamTimeSeconds((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const currentQ = activeQuestions[currentIndex];

  // Chuẩn hóa so sánh cho câu điền từ
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  };

  const checkAnswer = (q: QuizQuestion, answer: string | boolean | undefined) => {
    if (answer === undefined || answer === "") return false;
    if (q.type === "fill") {
      return normalizeText(String(answer)) === normalizeText(String(q.correctAnswer));
    }
    if (q.type === "true-false") {
      return Boolean(answer) === Boolean(q.correctAnswer);
    }
    return String(answer).trim() === String(q.correctAnswer).trim();
  };

  // Người dùng chọn câu trả lời
  const handleSelectAnswer = (ans: string | boolean) => {
    if (isSubmitted) return;
    if (!currentQ) return;

    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: ans }));

    // Trong chế độ Practice: Mở giải thích ngay
    if (mode === "practice") {
      setIsAnswerRevealed((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  };

  // Xử lý gửi câu điền từ
  const handleFillSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQ) return;
    const inputVal = fillInputs[currentQ.id] || "";
    handleSelectAnswer(inputVal);
  };

  // Nộp bài thi
  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    // Mở đáp án cho tất cả câu
    const allRevealed: Record<string, boolean> = {};
    activeQuestions.forEach((q) => {
      allRevealed[q.id] = true;
    });
    setIsAnswerRevealed(allRevealed);

    // Tính điểm
    const correctCount = activeQuestions.filter((q) => checkAnswer(q, userAnswers[q.id])).length;
    recordQuizResult(
      `quiz-${Date.now()}`,
      correctCount,
      activeQuestions.length
    );
  };

  // Tính kết quả
  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = activeQuestions.filter((q) => checkAnswer(q, userAnswers[q.id])).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case "basic":
        return { label: "Cơ bản", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
      case "medium":
        return { label: "Trung bình", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "hard":
        return { label: "Nâng cao", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" };
      default:
        return { label: "Tiêu chuẩn", color: "bg-muted text-muted-foreground border-border" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-surface">
        {/* Mode Switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-muted border border-border text-xs font-medium self-start">
          <button
            onClick={() => handleSwitchMode("practice")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mode === "practice"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Luyện theo Module
          </button>
          <button
            onClick={() => handleSwitchMode("exam")}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              mode === "exam"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Đề thi Thử thách
          </button>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {mode === "practice" && (
            <>
              <select
                value={selectedModule}
                onChange={(e) => {
                  setSelectedModule(e.target.value);
                  resetState();
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">Tất cả module ({questions.length} câu)</option>
                {curriculum.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.order}. {m.title}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  resetState();
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">Mọi độ khó</option>
                <option value="basic">Cơ bản</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Nâng cao</option>
              </select>
            </>
          )}

          {mode === "exam" && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-muted border border-border text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Thời gian: {formatTime(examTimeSeconds)}</span>
            </div>
          )}

          <button
            onClick={handleResetQuiz}
            className="p-1.5 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors text-xs flex items-center gap-1.5 px-2.5"
            title="Làm mới bài kiểm tra"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm lại</span>
          </button>
        </div>
      </div>

      {/* Main Quiz Area */}
      {totalQuestions > 0 ? (
        !isSubmitted ? (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-6">
            {/* Header: Progress & Navigator */}
            <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>
                    Câu hỏi <strong className="text-foreground">{currentIndex + 1}</strong> / {totalQuestions}
                  </span>
                  <span>•</span>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      getDifficultyBadge(currentQ?.difficulty || "basic").color
                    }`}
                  >
                    {getDifficultyBadge(currentQ?.difficulty || "basic").label}
                  </span>
                </div>
              </div>

              {/* In Exam Mode: Submit Button */}
              {mode === "exam" && (
                <button
                  onClick={handleSubmitExam}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Nộp bài ({answeredCount}/{totalQuestions})
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            {currentQ && (
              <div className="border border-border rounded-2xl p-6 sm:p-8 bg-surface space-y-6 shadow-sm">
                {/* Prompt Text / Code block */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>
                      {currentQ.type === "mcq" && "Trắc nghiệm 4 lựa chọn"}
                      {currentQ.type === "true-false" && "Câu hỏi Đúng / Sai"}
                      {currentQ.type === "code-reading" && "Đọc mã Verilog & Dự đoán"}
                      {currentQ.type === "fill" && "Điền từ khóa chính xác"}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-foreground leading-relaxed whitespace-pre-line">
                    {currentQ.prompt.split("```")[0]}
                  </h2>

                  {/* If code reading question contains code block */}
                  {currentQ.prompt.includes("```") && (
                    <div className="rounded-xl border border-border bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      <div className="text-[10px] text-muted-foreground uppercase pb-2 border-b border-border/20 mb-2 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-primary" />
                        Verilog Source
                      </div>
                      <pre>
                        {currentQ.prompt.substring(
                          currentQ.prompt.indexOf("```verilog") + 10 || currentQ.prompt.indexOf("```") + 3,
                          currentQ.prompt.lastIndexOf("```")
                        ).trim()}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Question Interactive Options */}
                <div className="pt-2">
                  {/* TYPE: MCQ or CODE-READING with options */}
                  {(currentQ.type === "mcq" || currentQ.type === "code-reading") && currentQ.options && (
                    <div className="grid grid-cols-1 gap-3">
                      {currentQ.options.map((option, idx) => {
                        const isSelected = userAnswers[currentQ.id] === option;
                        const isRevealed = isAnswerRevealed[currentQ.id];
                        const isCorrectOpt = option === currentQ.correctAnswer;

                        let optClasses = "border-border hover:border-primary/50 bg-surface hover:bg-surface-muted";
                        if (isSelected) {
                          optClasses = "border-primary bg-primary/5 ring-1 ring-primary";
                        }
                        if (isRevealed) {
                          if (isCorrectOpt) {
                            optClasses = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                          } else if (isSelected && !isCorrectOpt) {
                            optClasses = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(option)}
                            disabled={isRevealed && mode === "practice"}
                            className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3 ${optClasses}`}
                          >
                            <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5 bg-surface-muted">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1 leading-relaxed">{option}</span>
                            {isRevealed && isCorrectOpt && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            )}
                            {isRevealed && isSelected && !isCorrectOpt && (
                              <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE: TRUE / FALSE */}
                  {currentQ.type === "true-false" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Đúng (True)", value: true },
                        { label: "Sai (False)", value: false },
                      ].map((item, idx) => {
                        const isSelected = userAnswers[currentQ.id] === item.value;
                        const isRevealed = isAnswerRevealed[currentQ.id];
                        const isCorrectOpt = item.value === currentQ.correctAnswer;

                        let optClasses = "border-border hover:border-primary/50 bg-surface hover:bg-surface-muted";
                        if (isSelected) {
                          optClasses = "border-primary bg-primary/5 ring-1 ring-primary";
                        }
                        if (isRevealed) {
                          if (isCorrectOpt) {
                            optClasses = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold";
                          } else if (isSelected && !isCorrectOpt) {
                            optClasses = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(item.value)}
                            disabled={isRevealed && mode === "practice"}
                            className={`p-5 rounded-xl border text-center font-semibold text-base transition-all flex items-center justify-center gap-2.5 ${optClasses}`}
                          >
                            {item.value ? (
                              <Check className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <X className="w-5 h-5 text-rose-500" />
                            )}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE: FILL IN THE BLANK */}
                  {currentQ.type === "fill" && (
                    <form onSubmit={handleFillSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={fillInputs[currentQ.id] || (userAnswers[currentQ.id] as string) || ""}
                          onChange={(e) =>
                            setFillInputs({ ...fillInputs, [currentQ.id]: e.target.value })
                          }
                          disabled={isAnswerRevealed[currentQ.id] && mode === "practice"}
                          placeholder="Gõ từ khóa câu trả lời vào đây..."
                          className="flex-1 px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          disabled={
                            !(fillInputs[currentQ.id] || "").trim() ||
                            (isAnswerRevealed[currentQ.id] && mode === "practice")
                          }
                          className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          Kiểm tra
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Không phân biệt hoa thường và dấu tiếng Việt (Ví dụ: &quot;xor&quot;, &quot;gray&quot;, &quot;uu tien&quot;).
                      </p>
                    </form>
                  )}
                </div>

                {/* Explanation Card (Revealed after answer in practice mode) */}
                {isAnswerRevealed[currentQ.id] && (
                  <div
                    className={`p-5 rounded-xl border space-y-3 ${
                      checkAnswer(currentQ, userAnswers[currentQ.id])
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : "bg-rose-500/5 border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {checkAnswer(currentQ, userAnswers[currentQ.id]) ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Chính xác!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-500" />
                            <span className="text-rose-600 dark:text-rose-400">
                              Chưa chính xác!
                            </span>
                          </>
                        )}
                      </div>

                      <Link
                        href={`/learn/${currentQ.lessonSlug}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Xem bài học liên quan</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <div>
                        <strong>Đáp án chuẩn:</strong>{" "}
                        <span className="text-foreground font-semibold">
                          {String(currentQ.correctAnswer)}
                        </span>
                      </div>
                      <div className="whitespace-pre-line pt-1 text-foreground/90">
                        {currentQ.explanation}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-xs font-medium hover:bg-surface-muted transition-colors disabled:opacity-40"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {/* Question Indicators */}
                  <div className="hidden sm:flex items-center gap-1 max-w-[280px] overflow-x-auto py-1">
                    {activeQuestions.map((q, idx) => {
                      const isAns = userAnswers[q.id] !== undefined;
                      const isCorr = isAns && checkAnswer(q, userAnswers[q.id]);
                      const isRev = isAnswerRevealed[q.id];

                      let dotClass = "bg-surface-muted text-muted-foreground border-border";
                      if (idx === currentIndex) {
                        dotClass = "ring-2 ring-primary border-primary";
                      }
                      if (isRev) {
                        dotClass = isCorr
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : "bg-rose-500 text-white border-rose-600";
                      } else if (isAns) {
                        dotClass = "bg-primary text-primary-foreground border-primary";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-6 h-6 rounded-md text-[10px] font-semibold border flex items-center justify-center transition-all shrink-0 ${dotClass}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : mode === "practice" ? (
                    <button
                      onClick={() => setIsSubmitted(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <Award className="w-4 h-4" />
                      <span>Xem tổng kết điểm</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      <span>Nộp bài thi</span>
                      <FileCheck className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SCORECARD / RESULT SUMMARY VIEW */
          <div className="space-y-6">
            {/* Scorecard Hero */}
            <div className="border border-border rounded-2xl p-6 sm:p-8 bg-surface text-center space-y-4 shadow-sm relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Kết quả Luyện tập
                </h2>
                <p className="text-xs text-muted-foreground">
                  {mode === "exam" ? "Bài thi Thử thách tổng hợp" : "Luyện tập theo chuyên đề"}
                </p>
              </div>

              {/* Big Score Stats */}
              <div className="flex items-center justify-center gap-8 py-2">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    {correctCount} / {totalQuestions}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Số câu trả lời đúng</div>
                </div>

                <div className="w-px h-12 bg-border" />

                <div className="text-center">
                  <div
                    className={`text-3xl sm:text-4xl font-extrabold ${
                      scorePercent >= 80
                        ? "text-emerald-500"
                        : scorePercent >= 50
                        ? "text-amber-500"
                        : "text-rose-500"
                    }`}
                  >
                    {scorePercent}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Tỷ lệ chính xác</div>
                </div>
              </div>

              {/* Feedback Badge */}
              <div className="pt-1">
                {scorePercent >= 85 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> Xuất sắc! Bạn đã nắm rất vững kiến thức này.
                  </span>
                )}
                {scorePercent >= 65 && scorePercent < 85 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
                    Khá tốt! Hãy ôn lại một số bẫy câu hỏi làm sai bên dưới.
                  </span>
                )}
                {scorePercent < 65 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/20">
                    Cần ôn tập thêm! Hãy xem lại các bài học liên quan bên dưới.
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài này</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedModule("all");
                    setSelectedDifficulty("all");
                    handleSwitchMode("practice");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium hover:bg-surface-muted transition-colors"
                >
                  <span>Khám phá module khác</span>
                </button>
              </div>
            </div>

            {/* Answer Review Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <span>Xem lại chi tiết từng câu hỏi</span>
                </h3>

                {/* Filter Review Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border text-xs">
                  <button
                    onClick={() => setReviewFilter("all")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      reviewFilter === "all" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    Tất cả ({totalQuestions})
                  </button>
                  <button
                    onClick={() => setReviewFilter("wrong")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      reviewFilter === "wrong" ? "bg-rose-500 text-white font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    Câu sai ({totalQuestions - correctCount})
                  </button>
                  <button
                    onClick={() => setReviewFilter("correct")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      reviewFilter === "correct" ? "bg-emerald-600 text-white font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    Câu đúng ({correctCount})
                  </button>
                </div>
              </div>

              {/* Review Question Cards */}
              <div className="space-y-3">
                {activeQuestions
                  .filter((q) => {
                    const isCorr = checkAnswer(q, userAnswers[q.id]);
                    if (reviewFilter === "wrong") return !isCorr;
                    if (reviewFilter === "correct") return isCorr;
                    return true;
                  })
                  .map((q, idx) => {
                    const isCorr = checkAnswer(q, userAnswers[q.id]);
                    const uAns = userAnswers[q.id];

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-xl border bg-surface space-y-3 transition-all ${
                          isCorr ? "border-emerald-500/30" : "border-rose-500/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-semibold">
                              {isCorr ? (
                                <span className="inline-flex items-center gap-1 text-emerald-500">
                                  <CheckCircle2 className="w-4 h-4" /> Đúng
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-500">
                                  <XCircle className="w-4 h-4" /> Sai
                                </span>
                              )}
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                {curriculum.find((m) => m.slug === q.lessonSlug)?.title}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-foreground pt-1">
                              {q.prompt.split("```")[0]}
                            </h4>
                          </div>

                          <Link
                            href={`/learn/${q.lessonSlug}`}
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Bài học</span>
                          </Link>
                        </div>

                        <div className="text-xs space-y-1 bg-surface-muted/60 p-3 rounded-lg border border-border/60">
                          <div>
                            <strong>Bạn đã chọn:</strong>{" "}
                            <span
                              className={`font-semibold ${
                                isCorr ? "text-emerald-500" : "text-rose-500"
                              }`}
                            >
                              {uAns !== undefined ? String(uAns) : "Chưa trả lời"}
                            </span>
                          </div>
                          {!isCorr && (
                            <div>
                              <strong>Đáp án đúng:</strong>{" "}
                              <span className="text-emerald-500 font-semibold">
                                {String(q.correctAnswer)}
                              </span>
                            </div>
                          )}
                          <div className="pt-1 text-muted-foreground whitespace-pre-line leading-relaxed">
                            {q.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="border border-dashed border-border rounded-2xl p-12 text-center bg-surface space-y-3">
          <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-semibold text-foreground">
            Không tìm thấy câu hỏi phù hợp
          </h3>
          <p className="text-xs text-muted-foreground">
            Hãy điều chỉnh lại bộ lọc module hoặc độ khó.
          </p>
          <button
            onClick={() => {
              setSelectedModule("all");
              setSelectedDifficulty("all");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
