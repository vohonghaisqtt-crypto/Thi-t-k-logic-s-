"use client";

import React, { useState } from "react";
import {
  knowledgeMapNodes,
  mainSpineOrder,
  MapNode,
} from "@/data/knowledge-map";
import { NodeInspector } from "@/components/learning/NodeInspector";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowDown,
  CheckCircle2,
  Circle,
  Network,
  Sparkles,
  GitCommit,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function KnowledgeMap() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("stage-he-dem");
  const [showAllSubnodes, setShowAllSubnodes] = useState<boolean>(true);
  const { progress } = useProgress();

  const selectedNode = knowledgeMapNodes[selectedNodeId] || knowledgeMapNodes["stage-he-dem"];

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border bg-surface">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Lộ trình Cây Quan hệ Phụ thuộc
            </h3>
            <p className="text-xs text-muted-foreground">
              Nhấp vào từng khối để xem bản chất, điều kiện tiên quyết và nhánh chi tiết
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAllSubnodes(!showAllSubnodes)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-muted text-xs font-medium text-foreground hover:bg-surface-muted/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{showAllSubnodes ? "Thu gọn nhánh phụ" : "Mở rộng toàn bộ nhánh"}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Graph on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Center: Interactive Graph */}
        <div className="lg:col-span-2 space-y-3">
          {mainSpineOrder.map((spineId, index) => {
            const mainNode = knowledgeMapNodes[spineId];
            const isCompleted = progress.completedLessons.includes(mainNode.lessonSlug);
            const isSelected = selectedNodeId === mainNode.id;

            return (
              <React.Fragment key={mainNode.id}>
                {/* Connector Arrow from previous stage */}
                {index > 0 && (
                  <div className="flex justify-center py-1">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-border" />
                      <ArrowDown className="w-4 h-4 text-muted-foreground/60" />
                    </div>
                  </div>
                )}

                {/* Main Spine Node Card */}
                <div
                  className={cn(
                    "border rounded-2xl p-4 sm:p-5 transition-all bg-surface hover:shadow-md cursor-pointer relative",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 shadow-md"
                      : "border-border hover:border-primary/40",
                    isCompleted && "bg-success/[0.03]"
                  )}
                  onClick={() => setSelectedNodeId(mainNode.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Step Number Avatar */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0 border",
                          isCompleted
                            ? "bg-success/15 border-success/30 text-success"
                            : isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-surface-muted border-border text-muted-foreground"
                        )}
                      >
                        0{mainNode.stage}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                            {mainNode.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          {mainNode.label}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {mainNode.shortDef}
                        </p>
                      </div>
                    </div>

                    {/* Completion Status badge */}
                    <div className="shrink-0 pt-1">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Đã học</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded-full border border-border">
                          <Circle className="w-2.5 h-2.5" />
                          <span className="hidden sm:inline">Chưa học</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sub-nodes Branches (Expanded) */}
                  {showAllSubnodes && mainNode.subNodes && mainNode.subNodes.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-2 font-medium">
                        <GitCommit className="w-3 h-3 text-primary" />
                        <span>Chủ đề chi tiết:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mainNode.subNodes.map((subId) => {
                          const sub = knowledgeMapNodes[subId];
                          if (!sub) return null;
                          const isSubSelected = selectedNodeId === sub.id;

                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNodeId(sub.id);
                              }}
                              className={cn(
                                "text-xs px-2.5 py-1 rounded-lg border transition-all text-left flex items-center gap-1.5",
                                isSubSelected
                                  ? "bg-primary text-primary-foreground border-primary font-medium shadow-sm"
                                  : "bg-surface-muted/80 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                              )}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column: Node Inspector Panel (Sticky) */}
        <div className="lg:col-span-1">
          {selectedNode ? (
            <NodeInspector
              node={selectedNode}
              onClose={() => setSelectedNodeId("stage-he-dem")}
              onSelectNode={(id) => setSelectedNodeId(id)}
            />
          ) : (
            <div className="border border-border rounded-2xl p-6 bg-surface text-center text-xs text-muted-foreground">
              Nhấp vào một node trên bản đồ để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
