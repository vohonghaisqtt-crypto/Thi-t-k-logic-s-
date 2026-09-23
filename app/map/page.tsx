import React from "react";
import { KnowledgeMap } from "@/components/learning/KnowledgeMap";
import { Network } from "lucide-react";

export const metadata = {
  title: "Bản đồ Kiến thức & Chuẩn đầu ra | Thiết kế Logic Số & Verilog HDL",
  description:
    "Trực quan hóa quan hệ phụ thuộc 25 nodes và Ma trận 33 Chuẩn đầu ra cốt lõi từ 11 module: Hệ đếm, Boole, Tổ hợp, Tuần tự, Verilog, FSM và Mô phỏng.",
};

export default function MapPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <Network className="w-6 h-6 text-primary" />
          Bản đồ Kiến thức & Ma trận Chuẩn đầu ra
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hệ thống điều hướng năng lực toàn diện:{" "}
          <span className="font-semibold text-foreground">Cây quan hệ phụ thuộc 25 nodes</span> và{" "}
          <span className="font-semibold text-foreground">Ma trận 33 Chuẩn đầu ra cốt lõi</span> theo 11 module chuẩn học thuật.
        </p>
      </div>

      <KnowledgeMap />
    </div>
  );
}
