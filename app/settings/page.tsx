"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Settings,
  Trash2,
  Sun,
  Moon,
  Monitor,
  Database,
  Download,
  Upload,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  AlertTriangle,
  X,
  FileCheck,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useProgress } from "@/hooks/useProgress";
import { curriculum } from "@/data/curriculum";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    progress,
    isLoaded,
    toggleBookmark,
    resetProgress,
    importProgress,
  } = useProgress();

  const [showResetModal, setShowResetModal] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Thống kê tiến độ
  const totalLessons = curriculum.length;
  const completedCount = progress.completedLessons.length;
  const completionRate = Math.round((completedCount / totalLessons) * 100);

  const bookmarkedModules = curriculum.filter((m) =>
    progress.bookmarks.includes(m.slug)
  );

  const knownFlashcardsCount = Object.values(progress.flashcardState || {}).filter(
    (s) => s === "known"
  ).length;

  // Xuất file JSON
  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      const timestamp = new Date().toISOString().split("T")[0];
      downloadAnchor.setAttribute("download", `tk-logic-so-backup-${timestamp}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Đã xuất file dữ liệu tiến độ thành công!");
    } catch {
      showToast("Có lỗi khi tạo file xuất dữ liệu.", "error");
    }
  };

  // Nhập file JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Định dạng file không hợp lệ");
        }

        importProgress(parsed);
        showToast("Đã khôi phục dữ liệu tiến trình thành công!");
      } catch {
        showToast("File JSON không hợp lệ hoặc bị hỏng.", "error");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  // Xác nhận đặt lại dữ liệu
  const handleConfirmReset = () => {
    resetProgress();
    setShowResetModal(false);
    showToast("Toàn bộ dữ liệu học tập đã được đặt lại về trạng thái mặc định.");
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all animate-in fade-in slide-in-from-bottom-3 ${
            notification.type === "success"
              ? "bg-surface border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-surface border-danger/30 text-danger"
          }`}
        >
          <FileCheck className="w-4 h-4 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-primary" />
          Cài đặt & Quản lý Dữ liệu
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tùy chỉnh giao diện học tập, quản lý danh sách đánh dấu và sao lưu dữ liệu cá nhân.
        </p>
      </div>

      {/* Overview Statistics */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">
          Tổng quan Tiến trình Học tập
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col justify-between">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Bài hoàn thành
            </span>
            <div className="mt-3">
              <span className="text-2xl font-bold text-foreground">
                {isLoaded ? completedCount : "--"}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/{totalLessons}</span>
              <div className="w-full bg-surface-muted h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col justify-between">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              Đánh dấu (Bookmark)
            </span>
            <div className="mt-3">
              <span className="text-2xl font-bold text-foreground">
                {isLoaded ? progress.bookmarks.length : "--"}
              </span>
              <p className="text-[11px] text-muted-foreground mt-1">bài học lưu trữ</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col justify-between">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              Lịch sử Quiz
            </span>
            <div className="mt-3">
              <span className="text-2xl font-bold text-foreground">
                {isLoaded ? progress.quizHistory.length : "--"}
              </span>
              <p className="text-[11px] text-muted-foreground mt-1">lượt làm bài trắc nghiệm</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col justify-between">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              Flashcard Đã nhớ
            </span>
            <div className="mt-3">
              <span className="text-2xl font-bold text-foreground">
                {isLoaded ? knownFlashcardsCount : "--"}
              </span>
              <p className="text-[11px] text-muted-foreground mt-1">thẻ đã thuộc vững</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bookmarked Lessons Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500" />
            Bài học Đã đánh dấu ({bookmarkedModules.length})
          </h2>
          {bookmarkedModules.length > 0 && (
            <span className="text-xs text-muted-foreground">
              Nhấn vào bài để tiếp tục đọc
            </span>
          )}
        </div>

        {bookmarkedModules.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-border bg-surface/50 text-center space-y-2">
            <Bookmark className="w-8 h-8 mx-auto text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">Chưa có bài học nào được đánh dấu</p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Khi đọc bài học, bạn có thể nhấn vào nút Bookmark ở đầu trang hoặc cột mục lục bên phải để lưu lại những nội dung cần ôn tập kỹ.
            </p>
            <div className="pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
              >
                Khám phá lộ trình học tập
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedModules.map((module) => (
              <div
                key={module.slug}
                className="group relative p-4 rounded-xl border border-border bg-surface hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-medium text-primary px-2 py-0.5 rounded bg-primary/10">
                      Bài {module.order}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(module.slug)}
                      title="Bỏ đánh dấu bài học này"
                      className="text-muted-foreground hover:text-danger p-1 rounded transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mt-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {module.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {module.category}
                  </span>
                  <Link
                    href={`/learn/${module.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Vào học
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Theme Setting */}
      <section className="border border-border rounded-xl p-5 bg-surface space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Giao diện (Theme)</h3>
        <p className="text-xs text-muted-foreground">
          Chọn chế độ hiển thị phù hợp với điều kiện ánh sáng để đọc lâu không bị mỏi mắt.
        </p>
        <div className="grid grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-medium transition-colors ${
              theme === "light"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border bg-surface-muted hover:text-foreground"
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Sáng (Light)</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-medium transition-colors ${
              theme === "dark"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border bg-surface-muted hover:text-foreground"
            }`}
          >
            <Moon className="w-4 h-4 text-blue-400" />
            <span>Tối (Dark)</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("system")}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-medium transition-colors ${
              theme === "system"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border bg-surface-muted hover:text-foreground"
            }`}
          >
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <span>Hệ thống (Auto)</span>
          </button>
        </div>
      </section>

      {/* Storage & Backup Section */}
      <section className="border border-border rounded-xl p-5 bg-surface space-y-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Database className="w-4 h-4 text-primary" />
          <span>Sao lưu & Quản lý Dữ liệu Học tập</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Tiến trình học tập, lịch sử trắc nghiệm, trạng thái flashcard và các bài học đánh dấu đều được lưu an toàn trong trình duyệt cục bộ (Local Storage). Bạn có thể xuất file sao lưu để chuyển sang máy khác hoặc phục hồi khi cần.
        </p>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Export */}
          <div className="p-4 rounded-lg border border-border bg-surface-muted/50 flex flex-col justify-between space-y-3">
            <div>
              <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-primary" />
                Xuất dữ liệu tiến độ (Export JSON)
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Tải về máy file JSON chứa toàn bộ tiến độ, bookmarks và kết quả ôn tập.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border hover:border-primary text-xs font-medium text-foreground transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file backup (.json)</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-lg border border-border bg-surface-muted/50 flex flex-col justify-between space-y-3">
            <div>
              <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-primary" />
                Nhập dữ liệu tiến độ (Import JSON)
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Khôi phục lại tiến trình học tập từ file backup đã lưu trước đó.
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border hover:border-primary text-xs font-medium text-foreground transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Chọn file phục hồi</span>
            </button>
          </div>
        </div>

        {/* Danger Zone: Reset */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-foreground">Đặt lại toàn bộ dữ liệu (Reset All)</p>
            <p className="text-[11px] text-muted-foreground">
              Xóa sạch các bài đã hoàn thành, danh sách bookmarks, flashcards và kết quả quiz.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-danger/30 text-danger hover:bg-danger/10 text-xs font-medium transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Đặt lại dữ liệu</span>
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-danger/10 text-danger shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Xác nhận đặt lại dữ liệu?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Hành động này sẽ xóa toàn bộ bài học đã đánh dấu hoàn thành, danh sách bookmarks, lịch sử làm trắc nghiệm và trạng thái thẻ ghi nhớ. Bạn sẽ không thể hoàn tác nếu chưa xuất file backup.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-danger text-white text-xs font-medium hover:bg-danger/90 transition-colors"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
