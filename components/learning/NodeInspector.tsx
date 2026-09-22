"use client";

import React from "react";
import Link from "next/link";
import { MapNode, knowledgeMapNodes } from "@/data/knowledge-map";
import { X, ArrowRight, BookOpen, CheckCircle2, Circle, GitPullRequest, Layers } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

type NodeInspectorProps = {
  node: MapNode;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
};

export function NodeInspector({ node, onClose, onSelectNode }: NodeInspectorProps) {
  const { progress } = useProgress();
  const isCompleted = progress.completedLessons.includes(node.lessonSlug);

  return (
    <div className="border border-border rounded-2xl p-5 bg-surface shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-150 sticky top-20">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-semibold">
              Chặng {node.stage}
            </span>
            <span className="text-[11px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border">
              {node.category}
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground leading-snug">
            {node.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors"
          aria-label="Đóng chi tiết"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Short definition */}
      <div className="text-xs text-foreground/90 leading-relaxed bg-surface-muted/60 p-3 rounded-xl border border-border/60">
        <p className="font-medium text-foreground mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          Bản chất kiến thức:
        </p>
        <p className="text-muted-foreground leading-relaxed">{node.shortDef}</p>
      </div>

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
              return (
                <button
                  key={prereqId}
                  onClick={() => onSelectNode(prereqId)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-surface hover:bg-surface-muted hover:border-primary/40 text-[11px] text-foreground transition-all"
                  title="Xem chủ đề tiên quyết này"
                >
                  <span className="font-semibold text-primary">→</span>
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

      {/* Learning Status & CTA */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-success font-medium">Đã hoàn thành</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-muted-foreground/60" />
              <span className="text-muted-foreground">Chưa học</span>
            </>
          )}
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
