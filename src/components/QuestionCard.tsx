import type { AnswerValue, Question } from "../types";
import { MatchingQuestion } from "./MatchingQuestion";
import { OrderQuestion } from "./OrderQuestion";

type Props = {
  question: Question;
  value?: AnswerValue;
  disabled?: boolean;
  onChange: (value: AnswerValue) => void;
};

export function QuestionCard({ question, value, disabled, onChange }: Props) {
  return (
    <article className="question-card">
      <div className="question-meta">
        <span>{typeLabel(question.type)}</span>
        <span>{difficultyLabel(question.difficulty)}</span>
      </div>
      <h3>{question.question}</h3>
      {renderInput(question, value, disabled, onChange)}
    </article>
  );
}

function renderInput(
  question: Question,
  value: AnswerValue | undefined,
  disabled: boolean | undefined,
  onChange: (value: AnswerValue) => void
) {
  if (question.type === "true_false") {
    return (
      <div className="option-grid two">
        {[true, false].map((option) => (
          <button
            key={String(option)}
            className={value === option ? "selected" : ""}
            disabled={disabled}
            onClick={() => onChange(option)}
          >
            {option ? "נכון" : "לא נכון"}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "multiple_select") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="option-grid">
        {(question.options ?? []).map((option) => {
          const checked = selected.includes(option);
          return (
            <button
              key={option}
              className={checked ? "selected" : ""}
              disabled={disabled}
              onClick={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === "matching") {
    return (
      <MatchingQuestion
        question={question}
        value={(value as Record<string, string>) ?? {}}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  if (question.type === "ordering") {
    return (
      <OrderQuestion
        question={question}
        value={(value as string[]) ?? []}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="option-grid">
      {(question.options ?? []).map((option) => (
        <button
          key={option}
          className={value === option ? "selected" : ""}
          disabled={disabled}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function typeLabel(type: Question["type"]): string {
  const labels: Record<Question["type"], string> = {
    multiple_choice: "רב ברירה",
    multiple_select: "כמה תשובות",
    true_false: "נכון / לא נכון",
    matching: "התאמה",
    ordering: "סידור שלבים",
  };
  return labels[type];
}

function difficultyLabel(difficulty: Question["difficulty"]): string {
  return difficulty === "easy" ? "קל" : difficulty === "medium" ? "בינוני" : "אתגר";
}
