import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { DashboardProgressLive } from "@/components/dashboard/DashboardProgressLive";

export default function DashboardPage() {
  const roadMapNodes = [
    { title: "Hệ đếm", slug: "he-dem", desc: "Binary, Hex, BCD, Bù 2" },
    { title: "Boolean", slug: "dai-so-boole", desc: "Định luật, DeMorgan, Karnaugh" },
    { title: "Mạch tổ hợp", slug: "mach-to-hop", desc: "Encoder, MUX, Adder, Comparator" },
    { title: "Mạch tuần tự", slug: "mach-tuan-tu", desc: "Flip-Flop, Counter, Register" },
    { title: "Verilog HDL", slug: "verilog-co-ban", desc: "wire, reg, assign, always" },
    { title: "FSM", slug: "fsm", desc: "Moore, Mealy, State Register" },
    { title: "Mô phỏng", slug: "mo-phong-ise", desc: "Testbench, Waveform ISE 14.7" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Hero Section */}
      <div className="border border-border rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-surface to-surface-muted/60 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Learning Operating System
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Thiết kế Logic Số & Verilog HDL
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Học theo cấu trúc liên kết bản chất, không học vẹt rời rạc. Từ biểu diễn số học nhị phân đến thiết kế vi mạch FSM và mô phỏng kiểm chứng.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/learn/he-dem"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span>Bắt đầu học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-foreground text-sm font-medium hover:bg-surface-muted transition-colors"
            >
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span>Xem cây bản đồ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Continue Learning & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Continue Learning Card */}
        <div className="md:col-span-2 border border-border rounded-xl p-5 bg-surface flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium uppercase tracking-wider">Bài học đề xuất</span>
              <span>Module 01 / 11</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Bài 1: Hệ đếm và Biểu diễn Thông tin
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Nền tảng số nhị phân, chuyển đổi cơ số, mã Gray, số có dấu bù 1 và bù 2. Mấu chốt để thiết kế bộ cộng trừ và mô tả số trong Verilog.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-border mt-4">
            <div className="text-xs text-muted-foreground">
              Ước tính: <span className="font-medium text-foreground">90 phút</span>
            </div>
            <Link
              href="/learn/he-dem"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span>Vào bài học</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Progress Summary Card */}
        <DashboardProgressLive />
      </div>

      {/* Knowledge Map Overview - Interactive Linear Pipeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Trục xương sống kiến thức
          </h2>
          <Link
            href="/map"
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            <span>Bản đồ chi tiết</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {roadMapNodes.map((node, index) => (
            <Link
              key={node.slug}
              href={`/learn/${node.slug}`}
              className="group border border-border bg-surface hover:bg-surface-muted hover:border-primary/40 rounded-xl p-3.5 flex flex-col justify-between transition-all"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary">
                  0{index + 1}
                </span>
                <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {node.title}
                </h4>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {node.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Review Section */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          Bộ công cụ ôn luyện nhanh
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/glossary"
            className="border border-border bg-surface hover:bg-surface-muted rounded-xl p-4 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              Công thức cốt lõi
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Định luật DeMorgan, biểu thức Karnaugh, logic bù 2 và các công thức không được quên.
            </p>
          </Link>

          <Link
            href="/traps"
            className="border border-border bg-surface hover:bg-surface-muted rounded-xl p-4 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground group-hover:text-amber-500 transition-colors">
              Bẫy hay nhầm
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Phân biệt Moore vs Mealy, wire vs reg, = vs &lt;=, minterm vs maxterm tránh mất điểm.
            </p>
          </Link>

          <Link
            href="/quiz"
            className="border border-border bg-surface hover:bg-surface-muted rounded-xl p-4 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground group-hover:text-emerald-500 transition-colors">
              Luyện Quiz nhanh
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Câu hỏi trắc nghiệm và đọc mã Verilog, có giải thích chi tiết bám sát bài học.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
