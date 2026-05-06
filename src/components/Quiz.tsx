import { ArrowRight, CheckCircle2, RotateCcw, Send } from "lucide-react";
import { useMemo, useState } from "react";
import type { AnswerValue, Question } from "../types";
import { getQuestionScore } from "../utils/quiz";
import { QuestionCard } from "./QuestionCard";
import { ResultsScreen, type QuizResult } from "./ResultsScreen";

type Props = {
  title: string;
  questions: Question[];
  mode: "practice" | "exam";
  onBack: () => void;
  onComplete: (result: QuizResult) => void;
};

export function Quiz({ title, questions, mode, onBack, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const result = useMemo<QuizResult>(() => {
    const details = questions.map((question) => ({
      question,
      answer: answers[question.id],
      ...getQuestionScore(question, answers[question.id]),
    }));
    const correct = details.filter((item) => item.isCorrect).length;
    const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    return { score, correct, total: questions.length, details };
  }, [answers, questions]);

  function updateAnswer(questionId: string, value: AnswerValue) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function finishQuiz() {
    setFinished(true);
    onComplete(result);
  }

  if (finished) {
    return <ResultsScreen result={result} mode={mode} onBack={onBack} onRetry={() => {
      setAnswers({});
      setSubmitted({});
      setFinished(false);
    }} />;
  }

  return (
    <section className="quiz-shell">
      <div className="top-line">
        <button className="ghost-button" onClick={onBack}>
          <ArrowRight /> חזרה
        </button>
        <span>{mode === "practice" ? "משוב מיידי" : "תשובות בסוף"}</span>
      </div>
      <h2>{title}</h2>
      <div className="question-stack">
        {questions.map((question, index) => {
          const isSubmitted = submitted[question.id] || mode === "exam";
          const checked = getQuestionScore(question, answers[question.id]);

          return (
            <div className="question-block" key={question.id}>
              <span className="question-number">שאלה {index + 1} מתוך {questions.length}</span>
              <QuestionCard
                question={question}
                value={answers[question.id]}
                disabled={mode === "practice" && submitted[question.id]}
                onChange={(value) => updateAnswer(question.id, value)}
              />
              {mode === "practice" && !submitted[question.id] && (
                <button
                  className="check-button"
                  disabled={answers[question.id] === undefined}
                  onClick={() => setSubmitted((current) => ({ ...current, [question.id]: true }))}
                >
                  <CheckCircle2 /> בדוק תשובה
                </button>
              )}
              {mode === "practice" && submitted[question.id] && (
                <div className={checked.isCorrect ? "feedback correct" : "feedback wrong"}>
                  <strong>{checked.isCorrect ? "מעולה!" : "טעות מצוינת ללמידה."}</strong>
                  <p>{checked.isCorrect ? question.explanation : `${question.explanation} התשובה הנכונה: ${checked.correctAnswer}`}</p>
                  {!checked.isCorrect && (
                    <button
                      className="ghost-button"
                      onClick={() => {
                        setSubmitted((current) => ({ ...current, [question.id]: false }));
                        setAnswers((current) => {
                          const next = { ...current };
                          delete next[question.id];
                          return next;
                        });
                      }}
                    >
                      <RotateCcw /> נסה שוב
                    </button>
                  )}
                </div>
              )}
              {mode === "exam" && isSubmitted && null}
            </div>
          );
        })}
      </div>
      <div className="finish-row">
        <button
          className="primary-action compact"
          disabled={Object.keys(answers).length < questions.length}
          onClick={finishQuiz}
        >
          <Send /> {mode === "exam" ? "סיים מבחן" : "סיים תרגול"}
        </button>
      </div>
    </section>
  );
}
