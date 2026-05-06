export type QuestionType =
  | "multiple_choice"
  | "multiple_select"
  | "true_false"
  | "matching"
  | "ordering";

export type Lesson = {
  id: string;
  title: string;
  shortSummary: string;
  explanation: string[];
  remember: string[];
  didYouKnow: string;
  quickCheckIds: string[];
};

export type Question = {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options?: string[];
  answer?: string | string[] | boolean;
  pairs?: Array<{ left: string; right: string }>;
  items?: string[];
  explanation: string;
};

export type AnswerValue =
  | string
  | string[]
  | boolean
  | Record<string, string>;

export type CheckedAnswer = {
  isCorrect: boolean;
  correctAnswer: string;
};

export type ProgressData = {
  completedLessons: string[];
  lastScore: number | null;
  bestScore: number | null;
  mistakesByTopic: Record<string, number>;
};
