import { BarChart3, BookOpen, ClipboardCheck, PlayCircle } from "lucide-react";
import type { ProgressData } from "../types";

type Props = {
  progress: ProgressData;
  lessonCount: number;
  onLearn: () => void;
  onPractice: () => void;
  onExam: () => void;
  onProgress: () => void;
};

export function HomeScreen({ progress, lessonCount, onLearn, onPractice, onExam, onProgress }: Props) {
  const completed = progress.completedLessons.length;

  return (
    <section className="home-grid">
      <div className="home-intro">
        <p className="eyebrow">כיתה ו׳ | מערכת ההובלה בגוף האדם</p>
        <h1>מתכוננים למבחן במדעים: מערכת ההובלה</h1>
        <p className="lead">
          לומדים בפרקים קצרים, מתרגלים עם משוב מיידי, ואז עושים מבחן מסכם עם המלצות חזרה.
        </p>
        <div className="progress-strip" aria-label="התקדמות">
          <span>{completed} מתוך {lessonCount} פרקים הושלמו</span>
          <strong>{progress.bestScore ?? 0}% שיא אישי</strong>
        </div>
      </div>

      <div className="action-panel" aria-label="פעולות ראשיות">
        <button className="primary-action" onClick={onLearn}>
          <BookOpen />
          <span>להתחיל ללמוד</span>
        </button>
        <button onClick={onPractice}>
          <PlayCircle />
          <span>תרגול קצר</span>
        </button>
        <button onClick={onExam}>
          <ClipboardCheck />
          <span>מבחן מסכם</span>
        </button>
        <button onClick={onProgress}>
          <BarChart3 />
          <span>לראות התקדמות</span>
        </button>
      </div>
    </section>
  );
}
