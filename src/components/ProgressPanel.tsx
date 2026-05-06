import { ArrowRight, Trophy } from "lucide-react";
import type { Lesson, ProgressData } from "../types";

type Props = {
  progress: ProgressData;
  lessons: Lesson[];
  onBack: () => void;
};

export function ProgressPanel({ progress, lessons, onBack }: Props) {
  const weakTopics = Object.entries(progress.mistakesByTopic)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topicId, count]) => ({
      count,
      title: lessons.find((lesson) => lesson.id === topicId)?.title ?? topicId,
    }));

  return (
    <section className="progress-panel">
      <button className="ghost-button" onClick={onBack}>
        <ArrowRight /> חזרה
      </button>
      <h2>התקדמות</h2>
      <div className="stats-grid">
        <article>
          <span>ציון אחרון</span>
          <strong>{progress.lastScore ?? 0}%</strong>
        </article>
        <article>
          <span>ציון הכי טוב</span>
          <strong>{progress.bestScore ?? 0}%</strong>
        </article>
        <article>
          <span>פרקים שנלמדו</span>
          <strong>{progress.completedLessons.length}/{lessons.length}</strong>
        </article>
      </div>

      <div className="progress-lessons">
        {lessons.map((lesson) => (
          <div key={lesson.id} className={progress.completedLessons.includes(lesson.id) ? "lesson-row complete" : "lesson-row"}>
            <span>{lesson.title}</span>
            <small>{progress.completedLessons.includes(lesson.id) ? "הושלם" : "עוד לא"}</small>
          </div>
        ))}
      </div>

      <div className="recommendations">
        <h3><Trophy /> נושאים לחיזוק</h3>
        {weakTopics.length ? (
          weakTopics.map((topic) => (
            <p key={topic.title}>{topic.title}: {topic.count} טעויות</p>
          ))
        ) : (
          <p>עדיין אין טעויות שמורות. זה זמן מצוין להתחיל תרגול.</p>
        )}
      </div>
    </section>
  );
}
