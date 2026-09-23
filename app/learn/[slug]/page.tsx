import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAllLessons, getLessonBySlug, getAdjacentLessons } from "@/lib/content";
import { CourseNav } from "@/components/learning/CourseNav";
import { TableOfContents } from "@/components/learning/TableOfContents";
import { LessonFooter } from "@/components/learning/LessonFooter";
import { MarkdownRenderer } from "@/lib/markdown";
import { ReadingProgressBar } from "@/components/learning/ReadingProgressBar";
import { LessonExecutiveSummary } from "@/components/learning/LessonExecutiveSummary";
import { LessonActionHub } from "@/components/learning/LessonActionHub";
import { MobileTableOfContents } from "@/components/learning/MobileTableOfContents";
import { BackToTopButton } from "@/components/learning/BackToTopButton";
import { Clock, Tag, GitPullRequest, ArrowLeft } from "lucide-react";


type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((l) => ({
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) {
    return { title: "Không tìm thấy bài học" };
  }
  return {
    title: `${lesson.title} | Logic Số & Verilog HDL`,
    description: lesson.description,
  };
}

export default function LessonPage({ params }: PageProps) {
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(lesson.slug);

  return (
    <>
      <ReadingProgressBar />
      <div className="flex justify-center gap-8 w-full">
        {/* CỘT TRÁI: Course Navigation (Desktop >= 1024px) */}
        <CourseNav currentSlug={lesson.slug} />

        {/* CỘT GIỮA: Nội dung chính (Độ rộng tối ưu đọc 720-850px) */}
        <article className="w-full max-w-[850px] min-w-0 flex-1">
          {/* Back navigation on mobile */}
          <div className="lg:hidden mb-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DANH SÁCH CHƯƠNG TRÌNH</span>
            </Link>

          </div>

          {/* Lesson Header Banner */}
          <header className="space-y-3 pb-6 border-b border-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono font-semibold">
                Module {lesson.order < 10 ? `0${lesson.order}` : lesson.order}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {lesson.estimatedMinutes} phút đọc
              </span>
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-surface-muted px-2 py-0.5 rounded border border-border"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {lesson.title}
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {lesson.description}
            </p>

            {lesson.prerequisiteSlugs.length > 0 && (
              <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <GitPullRequest className="w-3.5 h-3.5 text-amber-500" />
                <span>Yêu cầu tiên quyết:</span>
                <div className="flex flex-wrap gap-1.5">
                  {lesson.prerequisiteSlugs.map((prereq) => (
                    <Link
                      key={prereq}
                      href={`/learn/${prereq}`}
                      className="underline hover:text-primary transition-colors font-medium text-foreground"
                    >
                      {prereq}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Khung nhận thức 60s & Mục tiêu cốt lõi */}
          <LessonExecutiveSummary lesson={lesson} />

          {/* Markdown Render Body */}
          <div className="pt-6">
            <MarkdownRenderer content={lesson.content} />
          </div>

          {/* Action Recall Hub: Chuyển từ Đọc sang Luyện tập chủ động */}
          <LessonActionHub lessonSlug={lesson.slug} lessonTitle={lesson.title} />

          {/* Footer Navigation (Next/Prev) */}
          <LessonFooter
            currentLesson={lesson}
            prevLesson={prev}
            nextLesson={next}
          />
        </article>

        {/* CỘT PHẢI: On this page TOC (Desktop >= 1280px) */}
        <TableOfContents
          headings={lesson.headings}
          lessonSlug={lesson.slug}
        />
      </div>

      {/* Drawer Mục Lục Di Động (Màn hình < 1280px) */}
      <MobileTableOfContents
        headings={lesson.headings}
        lessonSlug={lesson.slug}
      />

      {/* Nút Cuộn Lên Đầu Trang */}
      <BackToTopButton />
    </>
  );
}
