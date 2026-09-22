"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, BookOpen, Settings } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ghi log lỗi vào console để tiện debug
    console.error("Lỗi ứng dụng được bắt bởi Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Đã xảy ra lỗi không mong muốn
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ứng dụng gặp sự cố khi xử lý dữ liệu. Đừng lo lắng, dữ liệu tiến độ và đánh dấu của bạn trong trình duyệt vẫn được giữ an toàn.
        </p>
        {error.message && (
          <div className="p-3 rounded-lg bg-surface-muted border border-border text-xs font-mono text-muted-foreground text-left overflow-x-auto max-h-24">
            {error.message}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Thử tải lại trang</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium hover:bg-surface-muted transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>

        <Link
          href="/settings"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors text-xs"
        >
          <Settings className="w-4 h-4" />
          <span>Quản lý dữ liệu</span>
        </Link>
      </div>
    </div>
  );
}
