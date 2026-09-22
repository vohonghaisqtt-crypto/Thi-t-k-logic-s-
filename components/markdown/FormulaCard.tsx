"use client";

import React, { useState } from "react";
import { Copy, Check, FunctionSquare } from "lucide-react";

type FormulaCardProps = {
  formula: string;
  label?: string;
  note?: string;
  copyable?: boolean;
};

export function FormulaCard({
  formula,
  label,
  note,
  copyable = true,
}: FormulaCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-4 p-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-primary font-medium">
        <div className="flex items-center gap-1.5">
          <FunctionSquare className="w-4 h-4" />
          <span>{label || "Công thức cốt lõi"}</span>
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            title="Sao chép công thức"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-success">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="font-mono text-sm sm:text-base font-semibold text-foreground py-1 select-all overflow-x-auto">
        {formula}
      </div>

      {note && (
        <p className="text-xs text-muted-foreground border-t border-primary/10 pt-2 leading-relaxed">
          {note}
        </p>
      )}
    </div>
  );
}
