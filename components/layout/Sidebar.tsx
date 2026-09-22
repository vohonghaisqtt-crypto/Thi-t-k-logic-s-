"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  BookOpen,
  BookMarked,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  Settings,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/", label: "TỔNG QUAN", icon: LayoutDashboard },
  { href: "/map", label: "BẢN ĐỒ KIẾN THỨC", icon: Network },
  { href: "/learn", label: "HỌC THEO CHƯƠNG", icon: BookOpen },
  { href: "/glossary", label: "TỪ ĐIỂN CỐT LÕI", icon: BookMarked },
  { href: "/traps", label: "BẪY HAY NHẦM", icon: AlertTriangle },
  { href: "/review", label: "ÔN TẬP FLASHCARD", icon: RotateCcw },
  { href: "/quiz", label: "LUYỆN TẬP QUIZ", icon: HelpCircle },
  { href: "/settings", label: "CÀI ĐẶT & DỮ LIỆU", icon: Settings },
];


export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-border bg-surface shrink-0 h-screen sticky top-0 overflow-y-auto select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold text-sm tracking-tight text-foreground">
            Logic Số & Verilog
          </h1>
          <p className="text-xs text-muted-foreground">Learning Workspace</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1" aria-label="Menu chính">
        <div className="px-3 py-2 text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
          Điều hướng
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all group",

                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="rounded-lg bg-surface-muted p-3 text-xs border border-border">
          <p className="font-medium text-foreground">Nguồn tài liệu chuẩn</p>
          <p className="text-muted-foreground text-[11px] mt-0.5">
            Điện tử số • Verilog HDL • ISE Xilinx
          </p>
        </div>
      </div>
    </aside>
  );
}
