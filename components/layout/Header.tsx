"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navItems } from "@/components/layout/Sidebar";

export function Header({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const pathname = usePathname();

  // Find active label for breadcrumb
  const currentItem = navItems.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          type="button"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors font-semibold">
            TỔNG QUAN
          </Link>
          {currentItem && currentItem.href !== "/" && (
            <>
              <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
              <span className="font-semibold text-foreground">
                {currentItem.label}
              </span>
            </>
          )}
        </div>

      </div>

      {/* Right: Quick Search & Theme Toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface-muted text-xs text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
          title="Tìm kiếm nhanh (Ctrl + K)"
          aria-label="Mở tìm kiếm nhanh"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tìm kiếm nhanh...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono text-muted-foreground">
            Ctrl K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
