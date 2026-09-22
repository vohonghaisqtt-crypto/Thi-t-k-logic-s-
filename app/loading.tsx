import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full max-w-5xl space-y-6 animate-pulse py-6">
      {/* Header Skeleton */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="h-6 w-32 bg-surface-muted rounded-md" />
        <div className="h-8 w-3/4 max-w-lg bg-surface-muted rounded-lg" />
        <div className="h-4 w-full max-w-xl bg-surface-muted rounded-md" />
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 h-48 bg-surface rounded-xl border border-border p-6 space-y-3">
          <div className="h-4 w-24 bg-surface-muted rounded" />
          <div className="h-6 w-48 bg-surface-muted rounded" />
          <div className="h-4 w-full bg-surface-muted rounded" />
          <div className="h-4 w-5/6 bg-surface-muted rounded" />
        </div>
        <div className="h-48 bg-surface rounded-xl border border-border p-6 space-y-3">
          <div className="h-4 w-28 bg-surface-muted rounded" />
          <div className="h-4 w-full bg-surface-muted rounded" />
          <div className="h-4 w-full bg-surface-muted rounded" />
          <div className="h-4 w-3/4 bg-surface-muted rounded" />
        </div>
      </div>

      {/* Center Spinner Indicator */}
      <div className="flex items-center justify-center gap-2 pt-8 text-xs text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        <span>Đang tải không gian học tập...</span>
      </div>
    </div>
  );
}
