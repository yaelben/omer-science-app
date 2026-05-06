import { CheckCircle2, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import type { Lesson } from "../types";
import { HeartFlowDiagram } from "./HeartFlowDiagram";

type Props = {
  lesson: Lesson;
  index: number;
  total: number;
  isCompleted: boolean;
  onPrev: () => void;
  onNext: () => void;
  onQuickCheck: () => void;
};

export function LessonCard({ lesson, index, total, isCompleted, onPrev, onNext, onQuickCheck }: Props) {
  return (
    <section className="lesson-layout">
      <article className="lesson-card">
        <div className="lesson-meta">
          <span>פרק {index + 1} מתוך {total}</span>
          {isCompleted && (
            <span className="done-badge">
              <CheckCircle2 /> הושלם
            </span>
          )}
        </div>
        <h2>{lesson.title}</h2>
        <p className="summary">{lesson.shortSummary}</p>
        <div className="lesson-text">
          {lesson.explanation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="remember-box">
          <h3>נקודות לזכור</h3>
          <ul>
            {lesson.remember.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="did-you-know">
          <Lightbulb />
          <p>{lesson.didYouKnow}</p>
        </div>
        <div className="lesson-actions">
          <button onClick={onPrev} disabled={index === 0} aria-label="הפרק הקודם">
            <ChevronRight />
          </button>
          <button className="primary-action compact" onClick={onQuickCheck}>
            בדיקת הבנה
          </button>
          <button onClick={onNext} disabled={index === total - 1} aria-label="הפרק הבא">
            <ChevronLeft />
          </button>
        </div>
      </article>

      <aside className="side-panel">
        {lesson.id === "blood_flow" || lesson.id === "heart_structure" || lesson.id === "main_vessels" ? (
          <HeartFlowDiagram />
        ) : (
          <div className="memory-card">
            <h3>משפט זיכרון</h3>
            <p>עורק יוצא, וריד חוזר. ימין לריאות, שמאל לגוף.</p>
          </div>
        )}
      </aside>
    </section>
  );
}
