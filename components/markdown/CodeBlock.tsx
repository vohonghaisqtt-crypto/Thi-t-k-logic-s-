"use client";

import React, { useState, useMemo } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-verilog";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";

type CodeBlockProps = {
  language?: string;
  value: string;
  filename?: string;
};

export function CodeBlock({ language = "verilog", value, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const highlightedCode = useMemo(() => {
    const rawLang = (language || "verilog").toLowerCase();
    const lang = rawLang === "v" ? "verilog" : rawLang;
    const grammar = Prism.languages[lang] || Prism.languages.verilog;
    if (grammar) {
      try {
        return Prism.highlight(value, grammar, lang);
      } catch {
        return null;
      }
    }
    return null;
  }, [value, language]);

  return (
    <div className="my-5 rounded-xl border border-border/80 bg-slate-950 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono font-medium text-slate-300">
            {filename || (language ? language.toUpperCase() : "VERILOG")}
          </span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
          aria-label="Sao chép mã nguồn"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200 selection:bg-primary/30">
        <pre className="!bg-transparent !p-0 !m-0 font-mono">
          {highlightedCode ? (
            <code
              className={`language-${language || "verilog"} font-mono`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <code className="font-mono">{value}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
