"use client";

import { useState, useEffect, useCallback } from "react";
import { LearningProgress } from "@/lib/types";
import { getStoredProgress, saveProgress, defaultProgress } from "@/lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState<LearningProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = getStoredProgress();
    setProgress(loaded);
    setIsLoaded(true);
  }, []);

  const update = useCallback((updater: (prev: LearningProgress) => LearningProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleCompleteLesson = useCallback((slug: string) => {
    update((prev) => {
      const exists = prev.completedLessons.includes(slug);
      const completedLessons = exists
        ? prev.completedLessons.filter((s) => s !== slug)
        : [...prev.completedLessons, slug];
      return { ...prev, completedLessons };
    });
  }, [update]);

  const toggleBookmark = useCallback((slug: string) => {
    update((prev) => {
      const exists = prev.bookmarks.includes(slug);
      const bookmarks = exists
        ? prev.bookmarks.filter((s) => s !== slug)
        : [...prev.bookmarks, slug];
      return { ...prev, bookmarks };
    });
  }, [update]);

  const recordQuizResult = useCallback((quizId: string, score: number, total: number) => {
    update((prev) => ({
      ...prev,
      quizHistory: [
        ...prev.quizHistory,
        { quizId, score, total, completedAt: new Date().toISOString() },
      ],
    }));
  }, [update]);

  const setFlashcardStatus = useCallback((cardId: string, status: "new" | "learning" | "known") => {
    update((prev) => ({
      ...prev,
      flashcardState: {
        ...prev.flashcardState,
        [cardId]: status,
      },
    }));
  }, [update]);

  const setLastVisited = useCallback((slug: string) => {
    update((prev) => ({
      ...prev,
      lastVisitedLesson: slug,
    }));
  }, [update]);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
    setProgress(defaultProgress);
  }, []);

  const importProgress = useCallback((imported: Partial<LearningProgress>) => {
    const merged: LearningProgress = {
      ...defaultProgress,
      ...imported,
      completedLessons: Array.isArray(imported.completedLessons) ? imported.completedLessons : [],
      completedSections: Array.isArray(imported.completedSections) ? imported.completedSections : [],
      bookmarks: Array.isArray(imported.bookmarks) ? imported.bookmarks : [],
      quizHistory: Array.isArray(imported.quizHistory) ? imported.quizHistory : [],
      flashcardState: typeof imported.flashcardState === "object" && imported.flashcardState !== null ? imported.flashcardState : {},
      lastVisitedLesson: typeof imported.lastVisitedLesson === "string" ? imported.lastVisitedLesson : "he-dem",
    };
    saveProgress(merged);
    setProgress(merged);
  }, []);

  return {
    progress,
    isLoaded,
    toggleCompleteLesson,
    toggleBookmark,
    recordQuizResult,
    setFlashcardStatus,
    setLastVisited,
    resetProgress,
    importProgress,
  };
}
