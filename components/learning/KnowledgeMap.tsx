"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  knowledgeMapNodes,
  mainSpineOrder,
  MapNode,
} from "@/data/knowledge-map";
import { curriculum } from "@/data/curriculum";
import { NodeInspector } from "@/components/learning/NodeInspector";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Circle,
  Network,
  Sparkles,
  GitCommit,
  ListChecks,
  Target,
  Clock,
  AlertCircle,
  Check,
  BookOpen,
  Layers,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "tree" | "outcomes";

const COMPETENCY_GROUPS = [
  { id: "all", label: "Tất cả 11 Module" },
  { id: "cat-1", label: "I. Biểu diễn Thông tin & Boole", matchSlugs: ["he-dem", "dai-so-boole", "karnaugh"] },
  { id: "cat-2", label: "II. Thiết kế Mạch Logic Số", matchSlugs: ["mach-to-hop", "mach-so-hoc", "mach-tuan-tu", "counter-register"] },
  { id: "cat-3", label: "III. Chuyển dịch sang Verilog HDL", matchSlugs: ["verilog-co-ban", "verilog-behavioral", "fsm"] },
  { id: "cat-4", label: "IV. Kiểm chứng Mô phỏng ISE", matchSlugs: ["mo-phong-ise"] },
];

export function KnowledgeMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("tree");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("stage-he-dem");
  const [showAllSubnodes, setShowAllSubnodes] = useState<boolean>(true);
  const [selectedCompetency, setSelectedCompetency] = useState<string>("all");
  const { progress } = useProgress();

  const selectedNode = knowledgeMapNodes[selectedNodeId] || knowledgeMapNodes["stage-he-dem"];

  // Tính toán số lượng chuẩn đầu ra đã đạt
  const totalObjectives = curriculum.reduce((acc, mod) => acc + (mod.objectives?.length || 0), 0); // 33
  const completedObjectives = curriculum.reduce((acc, mod) => {
    if (progress.completedLessons.includes(mod.slug)) {
      return acc + (mod.objectives?.length || 0);
    }
    return acc;
  }, 0);
  const outcomesProgressPercent = totalObjectives > 0 ? Math.round((completedObjectives / totalObjectives) * 100) : 0;

  // Lọc curriculum theo nhóm năng lực
  const filteredCurriculum = curriculum.filter((mod) => {
    if (selectedCompetency === "all") return true;
    const group = COMPETENCY_GROUPS.find((g) => g.id === selectedCompetency);
    return group?.matchSlugs?.includes(mod.slug);
  });

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-surface shadow-xs">
        {/* Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-muted border border-border/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("tree")}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
              viewMode === "tree"
                ? "bg-surface text-primary shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Network className="w-4 h-4" />
            <span>Cây Phụ thuộc (25 Nodes)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("outcomes")}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
              viewMode === "outcomes"
                ? "bg-surface text-primary shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ListChecks className="w-4 h-4" />
            <span>Ma trận Chuẩn đầu ra (33 Mục tiêu)</span>
          </button>
        </div>

        {/* View Toggle (Only for Tree mode) */}
        {viewMode === "tree" ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllSubnodes(!showAllSubnodes)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-muted text-xs font-medium text-foreground hover:bg-surface-muted/80 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{showAllSubnodes ? "Thu gọn nhánh phụ" : "Mở rộng 18 nhánh phụ"}</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Tự đối chiếu & kiểm tra mức độ đạt chuẩn</span>
          </div>
        )}
      </div>

      {/* VIEW 1: CÂY QUAN HỆ PHỤ THUỘC (TREE VIEW) */}
      {viewMode === "tree" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / Center: Interactive Graph */}
          <div className="lg:col-span-2 space-y-3">
            {mainSpineOrder.map((spineId, index) => {
              const mainNode = knowledgeMapNodes[spineId];
              const isCompleted = progress.completedLessons.includes(mainNode.lessonSlug);
              const isSelected = selectedNodeId === mainNode.id;

              // Kiểm tra xem tất cả các tiên quyết của node này đã hoàn thành chưa
              const allPrereqsMet =
                mainNode.prerequisites.length === 0 ||
                mainNode.prerequisites.every((prereqId) => {
                  const pNode = knowledgeMapNodes[prereqId];
                  return pNode && progress.completedLessons.includes(pNode.lessonSlug);
                });

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
                      isCompleted && "bg-success/[0.02]"
                    )}
                    onClick={() => setSelectedNodeId(mainNode.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
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
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                              {mainNode.category}
                            </span>
                            {mainNode.estimatedMinutes && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/80 bg-surface-muted px-1.5 py-0.2 rounded border border-border/70">
                                <Clock className="w-2.5 h-2.5" />
                                ~{mainNode.estimatedMinutes}p
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-foreground">
                            {mainNode.label}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {mainNode.shortDef}
                          </p>

                          {/* Quick Formula Preview */}
                          {mainNode.keyFormulaOrRule && (
                            <div className="pt-1">
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 max-w-full truncate">
                                <Sparkles className="w-3 h-3 shrink-0" />
                                <span className="truncate">{mainNode.keyFormulaOrRule}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Completion / Readiness Badge */}
                      <div className="shrink-0 pt-1">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Đã học</span>
                          </span>
                        ) : allPrereqsMet ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sẵn sàng</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                            <AlertCircle className="w-3 h-3" />
                            <span className="hidden sm:inline">Thiếu tiên quyết</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sub-nodes Branches (Expanded) */}
                    {showAllSubnodes && mainNode.subNodes && mainNode.subNodes.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/60">
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-2 font-medium">
                          <GitCommit className="w-3 h-3 text-primary" />
                          <span>Chủ đề chi tiết ({mainNode.subNodes.length} nhánh):</span>
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
      )}

      {/* VIEW 2: MA TRẬN CHUẨN ĐẦU RA (LEARNING OUTCOMES MATRIX) */}
      {viewMode === "outcomes" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress Overview Banner */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-surface to-primary/5 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Tiến độ Làm chủ Chuẩn đầu ra Môn học
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Đo lường năng lực thực chiến dựa trên các bài học canonical đã hoàn tất trong hệ thống.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono text-primary">
                  {completedObjectives}
                  <span className="text-sm font-normal text-muted-foreground">/{totalObjectives}</span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {outcomesProgressPercent}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-muted h-2.5 rounded-full overflow-hidden border border-border">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${outcomesProgressPercent}%` }}
              />
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-xl bg-surface border border-border/80 text-center">
                <div className="text-[11px] text-muted-foreground">Tổng Module</div>
                <div className="font-bold text-foreground mt-0.5 font-mono">11 Module</div>
              </div>
              <div className="p-2 rounded-xl bg-surface border border-border/80 text-center">
                <div className="text-[11px] text-muted-foreground">Tổng Chuẩn đầu ra</div>
                <div className="font-bold text-foreground mt-0.5 font-mono">33 Mục tiêu</div>
              </div>
              <div className="p-2 rounded-xl bg-surface border border-border/80 text-center">
                <div className="text-[11px] text-muted-foreground">Module đã học</div>
                <div className="font-bold text-success mt-0.5 font-mono">{progress.completedLessons.length} / 11</div>
              </div>
              <div className="p-2 rounded-xl bg-surface border border-border/80 text-center">
                <div className="text-[11px] text-muted-foreground">Chuẩn đã đạt</div>
                <div className="font-bold text-primary mt-0.5 font-mono">{completedObjectives} / 33</div>
              </div>
            </div>
          </div>

          {/* Competency Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {COMPETENCY_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedCompetency(group.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                  selectedCompetency === group.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                )}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Outcomes Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCurriculum.map((module) => {
              const isModuleDone = progress.completedLessons.includes(module.slug);

              return (
                <div
                  key={module.slug}
                  className={cn(
                    "rounded-2xl border p-5 bg-surface space-y-4 transition-all hover:shadow-md flex flex-col justify-between",
                    isModuleDone
                      ? "border-success/30 bg-success/[0.015]"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                            Bài 0{module.order}
                          </span>
                          <span className="text-[10px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border">
                            {module.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-foreground leading-snug">
                          {module.title}
                        </h4>
                      </div>

                      {/* Status badge */}
                      {isModuleDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/30 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã đạt chuẩn
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded-full border border-border shrink-0">
                          <Circle className="w-3 h-3" />
                          Chưa học
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {module.description}
                    </p>

                    {/* Objectives Checklist */}
                    <div className="pt-2 border-t border-border/70 space-y-2">
                      <div className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-primary" />
                        <span>3 Chuẩn đầu ra cốt lõi:</span>
                      </div>

                      <div className="space-y-1.5">
                        {(module.objectives || []).map((obj, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex items-start gap-2.5 p-2 rounded-xl text-xs transition-colors",
                              isModuleDone
                                ? "bg-success/5 border border-success/20 text-foreground"
                                : "bg-surface-muted/50 border border-border/60 text-muted-foreground"
                            )}
                          >
                            <span className="pt-0.5 shrink-0">
                              {isModuleDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-muted-foreground/40 flex items-center justify-center text-[9px] font-mono">
                                  {idx + 1}
                                </span>
                              )}
                            </span>
                            <span className="text-[11px] leading-relaxed">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-border flex items-center justify-between gap-3 text-xs">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      ~{module.estimatedMinutes} phút
                    </span>

                    <Link
                      href={`/learn/${module.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                    >
                      <span>Vào học ngay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
