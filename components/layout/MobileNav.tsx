"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  RotateCcw,
  HelpCircle,
  X,
  Cpu,
} from "lucide-react";
import { navItems } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-72 max-w-[80vw] bg-surface h-full border-r border-border flex flex-col z-10 shadow-2xl">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-foreground">
              Logic Số & Verilog
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const bottomItems = [
    { href: "/", label: "TỔNG QUAN", icon: LayoutDashboard },
    { href: "/learn", label: "HỌC TẬP", icon: BookOpen },
    { href: "/review", label: "ÔN TẬP", icon: RotateCcw },
    { href: "/quiz", label: "QUIZ", icon: HelpCircle },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-surface/95 backdrop-blur-md border-t border-border z-30 flex items-center justify-around px-2"
      aria-label="Thanh điều hướng di động"
    >
      {bottomItems.map((item) => {
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
              "flex flex-col items-center justify-center gap-0.5 w-16 h-11 rounded-lg text-[9px] font-semibold tracking-wider transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>

  );
}
