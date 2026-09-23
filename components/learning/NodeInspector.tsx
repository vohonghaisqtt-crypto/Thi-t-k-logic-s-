"use client";

import React from "react";
import Link from "next/link";
import { MapNode, knowledgeMapNodes } from "@/data/knowledge-map";
import {
  X,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  GitPullRequest,
  Layers,
  Sparkles,
  Target,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type NodeInspectorProps = {
  node: MapNode;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
};

export function NodeInspector({ node, onClose, onSelectNode }: NodeInspectorProps) {
  const { progress } = useProgress();
  const isCompleted = progress.completedLessons.includes(node.lessonSlug);

  // Kiểm tra xem tất cả các điều kiện tiên quyết đã hoàn thành chưa
  const allPrereqsMet =
    node.prerequisites.length === 0 ||
    node.prerequisites.every((prereqId) => {
      const pNode = knowledgeMapNodes[prereqId];
      return pNode && progress.completedLessons.includes(pNode.lessonSlug);
    });

  return (
    <div className="border border-border rounded-2xl p-5 bg-surface shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-150 sticky top-20">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-semibold">
              Chặng {node.stage}
            </span>
            <span className="text-[10px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border">
              {node.category}
            </span>
            {node.estimatedMinutes && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border">
                <Clock className="w-3 h-3 text-muted-foreground/70" />
                ~{node.estimatedMinutes}p
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-foreground leading-snug">
            {node.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors shrink-0"
          aria-label="Đóng chi tiết"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Trạng thái sẵn sàng học (Readiness Badge) */}
      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-border/70 bg-surface-muted/50">
        <span className="text-muted-foreground text-[11px] font-medium">Tình trạng học tập:</span>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã hoàn thành
          </span>
        ) : allPrereqsMet ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30">
            <Check className="w-3.5 h-3.5" />
            Sẵn sàng học ngay
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            Cần học bài trước
          </span>
        )}
      </div>

      {/* Quy tắc vàng / Công thức then chốt */}
      {node.keyFormulaOrRule && (
        <div className="text-xs p-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quy tắc vàng / Công thức cốt lõi:</span>
          </div>
          <p className="font-mono text-[11px] text-foreground/95 leading-relaxed bg-surface/80 p-2 rounded-lg border border-amber-500/20">
            {node.keyFormulaOrRule}
          </p>
        </div>
      )}

      {/* Short definition */}
      <div className="text-xs text-foreground/90 leading-relaxed bg-surface-muted/60 p-3 rounded-xl border border-border/60">
        <p className="font-medium text-foreground mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          Bản chất kiến thức:
        </p>
        <p className="text-muted-foreground leading-relaxed text-[11px]">{node.shortDef}</p>
      </div>

      {/* Chuẩn đầu ra cần đạt (Learning Outcomes) */}
      {node.objectives && node.objectives.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span>Chuẩn đầu ra cần đạt:</span>
          </div>
          <div className="space-y-1 bg-surface-muted/40 p-2.5 rounded-xl border border-border/60">
            {node.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-foreground/85 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 mt-1.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prerequisites section */}
      {node.prerequisites.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <GitPullRequest className="w-3.5 h-3.5 text-amber-500" />
            <span>Điều kiện tiên quyết:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {node.prerequisites.map((prereqId) => {
              const prereqNode = knowledgeMapNodes[prereqId];
              if (!prereqNode) return null;
              const isPrereqDone = progress.completedLessons.includes(prereqNode.lessonSlug);

              return (
                <button
                  key={prereqId}
                  onClick={() => onSelectNode(prereqId)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] transition-all",
                    isPrereqDone
                      ? "border-success/30 bg-success/5 text-success hover:bg-success/10"
                      : "border-border bg-surface hover:bg-surface-muted hover:border-primary/40 text-foreground"
                  )}
                  title={isPrereqDone ? "Đã hoàn thành bài học này" : "Chưa hoàn thành bài học này"}
                >
                  {isPrereqDone ? (
                    <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                  ) : (
                    <Circle className="w-3 h-3 text-muted-foreground shrink-0" />
                  )}
                  <span>{prereqNode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-branches if any */}
      {node.subNodes && node.subNodes.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Các nhánh chi tiết bên trong:</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {node.subNodes.map((subId) => {
              const sub = knowledgeMapNodes[subId];
              if (!sub) return null;
              return (
                <button
                  key={subId}
                  onClick={() => onSelectNode(subId)}
                  className="text-left px-2.5 py-1 rounded-lg hover:bg-surface-muted text-[11px] text-foreground/80 hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>• {sub.label}</span>
                  <span className="text-[10px] text-muted-foreground">Chi tiết →</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        <div className="text-[11px] text-muted-foreground">
          {node.isMainSpine ? "Khối cốt lõi" : "Chủ đề chi tiết"}
        </div>

        <Link
          href={`/learn/${node.lessonSlug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <span>Vào bài học</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
