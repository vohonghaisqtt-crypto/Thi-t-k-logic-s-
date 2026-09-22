import React from "react";
import { KnowledgeMap } from "@/components/learning/KnowledgeMap";
import { Network } from "lucide-react";

export const metadata = {
  title: "Bản đồ Kiến thức | Logic Số & Verilog HDL",
  description: "Trực quan hóa quan hệ phụ thuộc và lộ trình học tập: Hệ đếm, Boole, Mạch tổ hợp, Tuần tự, Verilog, FSM và Mô phỏng.",
};

export default function MapPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <Network className="w-6 h-6 text-primary" />
          Bản đồ Quan hệ Phụ thuộc Kiến thức
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Nhìn toàn cảnh mối liên hệ bản chất: <span className="font-semibold text-foreground">Hệ đếm → Boolean → Mạch tổ hợp → Mạch tuần tự → Verilog → FSM → Mô phỏng</span>.
        </p>
      </div>

      <KnowledgeMap />
    </div>
  );
}
