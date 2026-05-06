import { useMemo, useState } from "react";
import lessonsData from "./data/learning_material_he.json";
import questionsData from "./data/question_bank_he.json";
import { HomeScreen } from "./components/HomeScreen";
import { LessonCard } from "./components/LessonCard";
import { ProgressPanel } from "./components/ProgressPanel";
import { Quiz } from "./components/Quiz";
import type { Lesson, ProgressData, Question } from "./types";
import { buildExamQuestions, shuffle } from "./utils/quiz";
import { loadProgress, saveProgress } from "./utils/progress";

type View = "home" | "learn" | "quickCheck" | "practice" | "exam" | "progress";

const lessons = lessonsData as Lesson[];
const questions = questionsData as Question[];

export default function App() {
  const [view, setView] = useState<View>("home");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>(() => shuffle(questions).slice(0, 8));
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => buildExamQuestions(questions));

  const currentLesson = lessons[lessonIndex];
  const quickCheckQuestions = useMemo(
    () => questions.filter((question) => currentLesson.quickCheckIds.includes(question.id)),
    [currentLesson]
  );

  function updateProgress(next: ProgressData) {
    setProgress(next);
    saveProgress(next);
  }

  function applyQuizResult(
    baseProgress: ProgressData,
    result: { score: number; details: Array<{ question: Question; isCorrect: boolean }> }
  ): ProgressData {
    const mistakesByTopic = { ...baseProgress.mistakesByTopic };
    result.details
      .filter((detail) => !detail.isCorrect)
      .forEach((detail) => {
        mistakesByTopic[detail.question.topic] = (mistakesByTopic[detail.question.topic] ?? 0) + 1;
      });

    return {
      ...baseProgress,
      lastScore: result.score,
      bestScore: Math.max(baseProgress.bestScore ?? 0, result.score),
      mistakesByTopic,
    };
  }

  function recordQuiz(result: { score: number; details: Array<{ question: Question; isCorrect: boolean }> }) {
    updateProgress(applyQuizResult(progress, result));
  }

  function resetPractice() {
    setPracticeQuestions(shuffle(questions).slice(0, 8));
    setView("practice");
  }

  function resetExam() {
    setExamQuestions(buildExamQuestions(questions));
    setView("exam");
  }

  return (
    <main className="app-shell">
      {view === "home" && (
        <HomeScreen
          progress={progress}
          lessonCount={lessons.length}
          onLearn={() => setView("learn")}
          onPractice={resetPractice}
          onExam={resetExam}
          onProgress={() => setView("progress")}
        />
      )}

      {view === "learn" && (
        <LessonCard
          lesson={currentLesson}
          index={lessonIndex}
          total={lessons.length}
          isCompleted={progress.completedLessons.includes(currentLesson.id)}
          onPrev={() => setLessonIndex((index) => Math.max(0, index - 1))}
          onNext={() => setLessonIndex((index) => Math.min(lessons.length - 1, index + 1))}
          onQuickCheck={() => setView("quickCheck")}
        />
      )}

      {view === "quickCheck" && (
        <Quiz
          title={`בדיקת הבנה: ${currentLesson.title}`}
          mode="practice"
          questions={quickCheckQuestions}
          onBack={() => setView("learn")}
          onComplete={(result) => {
            const scoredProgress = applyQuizResult(progress, result);
            if (result.score >= 60) {
              const completedLessons = scoredProgress.completedLessons.includes(currentLesson.id)
                ? scoredProgress.completedLessons
                : [...scoredProgress.completedLessons, currentLesson.id];
              updateProgress({ ...scoredProgress, completedLessons });
              return;
            }
            updateProgress(scoredProgress);
          }}
        />
      )}

      {view === "practice" && (
        <Quiz
          title="תרגול קצר"
          mode="practice"
          questions={practiceQuestions}
          onBack={() => setView("home")}
          onComplete={recordQuiz}
        />
      )}

      {view === "exam" && (
        <Quiz
          title="מבחן מסכם"
          mode="exam"
          questions={examQuestions}
          onBack={() => setView("home")}
          onComplete={recordQuiz}
        />
      )}

      {view === "progress" && <ProgressPanel progress={progress} lessons={lessons} onBack={() => setView("home")} />}
    </main>
  );
}
