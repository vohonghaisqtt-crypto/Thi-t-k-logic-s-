import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-2">
        <FileQuestion className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        404 - Không tìm thấy nội dung
      </h1>
      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
        Bài học hoặc trang bạn tìm kiếm không tồn tại hoặc đã được cập nhật đường dẫn trong giáo trình.
      </p>
      <div className="pt-2">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh mục bài học</span>
        </Link>
      </div>
    </div>
  );
}
