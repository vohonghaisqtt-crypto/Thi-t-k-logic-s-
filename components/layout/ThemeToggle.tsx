"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border bg-surface-muted animate-pulse" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Chuyển giao diện (hiện tại: ${theme})`}
      title={`Chế độ: ${theme === "dark" ? "Tối" : theme === "light" ? "Sáng" : "Hệ thống"} (Nhấn để chuyển)`}
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4 text-blue-400" />
      ) : theme === "light" ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Monitor className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}
