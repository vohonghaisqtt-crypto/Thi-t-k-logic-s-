export type HeadingNode = {
  id: string;
  text: string;
  level: number;
};

export type Lesson = {
  slug: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  prerequisiteSlugs: string[];
  headings: HeadingNode[];
  tags: string[];
  content: string;
  objectives?: string[];
};


export type CurriculumModule = {
  slug: string;
  order: number;
  title: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  prerequisites: string[];
  objectives?: string[];
};

export type GlossaryItem = {
  id: string;
  term: string;
  definition: string;
  category: string;
  formula?: string;
  related?: string[];
  lessonSlug: string;
};

export type TrapItem = {
  id: string;
  category: string;
  title: string;
  wrong: string;
  correct: string;
  memoryTip?: string;
  lessonSlug: string;
  priority: 'high' | 'normal';
};

export type QuizQuestion = {
  id: string;
  lessonSlug: string;
  type: 'mcq' | 'true-false' | 'fill' | 'code-reading';
  prompt: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  relatedSection?: string;
  difficulty: 'basic' | 'medium' | 'hard';
};

export type FlashcardItem = {
  id: string;
  category: 'formula' | 'concept' | 'trap' | 'verilog';
  front: string;
  back: string;
  lessonSlug: string;
  tip?: string;
};

export type LearningProgress = {
  completedLessons: string[];
  completedSections: string[];
  bookmarks: string[];
  quizHistory: {
    quizId: string;
    score: number;
    total: number;
    completedAt: string;
  }[];
  flashcardState: Record<string, 'new' | 'learning' | 'known'>;
  lastVisitedLesson?: string;
};
