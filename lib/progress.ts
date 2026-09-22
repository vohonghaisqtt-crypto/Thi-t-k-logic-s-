import { LearningProgress } from "@/lib/types";

export const STORAGE_KEY = "study-logic-progress";

export const defaultProgress: LearningProgress = {
  completedLessons: [],
  completedSections: [],
  bookmarks: [],
  quizHistory: [],
  flashcardState: {},
  lastVisitedLesson: "he-dem",
};

export function getStoredProgress(): LearningProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch (e) {
    console.error("Error reading progress from localStorage", e);
    return defaultProgress;
  }
}

export function saveProgress(progress: LearningProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error saving progress to localStorage", e);
  }
}
