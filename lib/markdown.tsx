"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/markdown/CodeBlock";
import { FormulaCard } from "@/components/markdown/FormulaCard";
import { slugify } from "@/lib/content";
import { Hash, Info } from "lucide-react";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="group flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-4 pt-4 border-t border-border scroll-mt-20"
              >
                <span>{children}</span>
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-opacity"
                  aria-label={`Liên kết trực tiếp tới mục ${text}`}
                  title="Sao chép liên kết mục này"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, "", `#${id}`);
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Hash className="w-4 h-4" />
                </a>
              </h2>
            );
          },
          h3({ children }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="group flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground mt-6 mb-3 scroll-mt-20"
              >
                <span>{children}</span>
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-opacity"
                  aria-label={`Liên kết tới mục ${text}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, "", `#${id}`);
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Hash className="w-3.5 h-3.5" />
                </a>
              </h3>
            );
          },
          p({ children }) {
            return (
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-4">
                {children}
              </p>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-outside pl-5 mb-4 space-y-1 text-sm sm:text-base text-foreground/90">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-outside pl-5 mb-4 space-y-1 text-sm sm:text-base text-foreground/90">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="leading-relaxed">{children}</li>;
          },
          blockquote({ children }) {
            // Extract string to detect callout intention
            let text = "";
            const extractText = (node: any): string => {
              if (typeof node === "string") return node;
              if (Array.isArray(node)) return node.map(extractText).join(" ");
              if (node && node.props && node.props.children) return extractText(node.props.children);
              return "";
            };
            text = extractText(children).toLowerCase();

            const isWarning = text.includes("cạm bẫy") || text.includes("sai lầm") || text.includes("nguy hiểm") || text.includes("lỗi") || text.includes("[!warning]");
            const isTip = text.includes("mẹo") || text.includes("kinh nghiệm") || text.includes("[!tip]");
            const isHardware = text.includes("verilog") || text.includes("phần cứng") || text.includes("reg") || text.includes("flip-flop");

            if (isWarning) {
              return (
                <aside
                  aria-label="Cảnh báo cạm bẫy thiết kế"
                  className="my-5 p-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/10 text-sm sm:text-base text-foreground flex items-start gap-3 shadow-xs"
                >
                  <span className="p-1 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 font-bold">
                    ⚠️
                  </span>
                  <div className="space-y-1 leading-relaxed [&>p]:mb-0 font-medium">
                    {children}
                  </div>
                </aside>
              );
            }

            if (isTip) {
              return (
                <aside
                  aria-label="Mẹo thực chiến"
                  className="my-5 p-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/10 text-sm sm:text-base text-foreground flex items-start gap-3 shadow-xs"
                >
                  <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 font-bold">
                    💡
                  </span>
                  <div className="space-y-1 leading-relaxed [&>p]:mb-0 font-medium">
                    {children}
                  </div>
                </aside>
              );
            }

            if (isHardware) {
              return (
                <aside
                  aria-label="Tư duy phần cứng Verilog"
                  className="my-5 p-4 rounded-xl border-l-4 border-violet-500 bg-violet-500/10 text-sm sm:text-base text-foreground flex items-start gap-3 shadow-xs"
                >
                  <span className="p-1 rounded-md bg-violet-500/20 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5 font-bold">
                    ⚡
                  </span>
                  <div className="space-y-1 leading-relaxed [&>p]:mb-0 font-medium">
                    {children}
                  </div>
                </aside>
              );
            }

            return (
              <aside
                aria-label="Khái niệm cốt lõi"
                className="my-5 p-4 rounded-xl border-l-4 border-primary bg-primary/5 text-sm sm:text-base text-foreground flex items-start gap-3 shadow-xs"
              >
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed [&>p]:mb-0 font-medium">
                  {children}
                </div>
              </aside>
            );
          },
          table({ children }) {
            return (
              <div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-surface-muted/90 text-foreground border-b border-border font-semibold">
                {children}
              </thead>
            );
          },
          tbody({ children }) {
            return (
              <tbody className="divide-y divide-border/40 [&>tr:nth-child(even)]:bg-surface-muted/25 [&>tr:hover]:bg-primary/[0.04] transition-colors">
                {children}
              </tbody>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2.5 text-foreground/90 font-mono text-xs sm:text-sm">
                {children}
              </td>
            );
          },

          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const content = String(children).replace(/\n$/, "");

            // If multiline code block
            if (match || content.includes("\n")) {
              if (language === "formula") {
                return <FormulaCard formula={content} />;
              }
              return (
                <CodeBlock
                  language={language || "verilog"}
                  value={content}
                />
              );
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 rounded-md bg-surface-muted border border-border text-primary font-mono text-xs sm:text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          hr() {
            return <hr className="my-8 border-border" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
