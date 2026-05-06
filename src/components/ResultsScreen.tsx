import { ArrowRight, RotateCcw } from "lucide-react";
import type { AnswerValue, Question } from "../types";

export type QuizResult = {
  score: number;
  correct: number;
  total: number;
  details: Array<{
    question: Question;
    answer?: AnswerValue;
    isCorrect: boolean;
    correctAnswer: string;
  }>;
};

type Props = {
  result: QuizResult;
  mode: "practice" | "exam";
  onBack: () => void;
  onRetry: () => void;
};

export function ResultsScreen({ result, mode, onBack, onRetry }: Props) {
  const mistakes = result.details.filter((detail) => !detail.isCorrect);
  const topics = Array.from(new Set(mistakes.map((detail) => detail.question.topic)));

  return (
    <section className="results-screen">
      <div className="result-hero">
        <p className="eyebrow">{mode === "exam" ? "מבחן מסכם" : "תרגול"}</p>
        <h2>{result.score}%</h2>
        <p>{result.correct} תשובות נכונות מתוך {result.total}</p>
      </div>

      {topics.length > 0 ? (
        <div className="recommendations">
          <h3>כדאי לחזור על</h3>
          <div className="topic-chips">
            {topics.map((topic) => (
              <span key={topic}>{topicName(topic)}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="feedback correct">
          <strong>מעולה!</strong>
          <p>לא נמצאו טעויות בסבב הזה.</p>
        </div>
      )}

      <div className="review-list">
        {mistakes.map((detail) => (
          <article key={detail.question.id}>
            <h3>{detail.question.question}</h3>
            <p>{detail.question.explanation}</p>
            <p><strong>התשובה הנכונה:</strong> {detail.correctAnswer}</p>
          </article>
        ))}
      </div>

      <div className="lesson-actions">
        <button onClick={onBack}>
          <ArrowRight /> חזרה
        </button>
        <button className="primary-action compact" onClick={onRetry}>
          <RotateCcw /> נסה שוב
        </button>
      </div>
    </section>
  );
}

function topicName(topic: string): string {
  const names: Record<string, string> = {
    transport_role: "תפקידי מערכת ההובלה",
    systems_cooperation: "שיתוף פעולה בין מערכות",
    closed_open_system: "מערכת סגורה ופתוחה",
    main_parts: "לב, דם וכלי דם",
    blood_components: "הרכב הדם",
    blood_vessels: "עורקים, ורידים ונימים",
    main_vessels: "כלי דם ראשיים",
    heart_structure: "מבנה הלב",
    blood_flow: "זרימת הדם",
    alveoli_capillaries: "נאדיות הריאה",
    heart_rate: "דופק",
  };
  return names[topic] ?? topic;
}
