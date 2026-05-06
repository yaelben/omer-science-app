import type { Question } from "../types";

type Props = {
  question: Question;
  value: Record<string, string>;
  disabled?: boolean;
  onChange: (value: Record<string, string>) => void;
};

export function MatchingQuestion({ question, value, disabled, onChange }: Props) {
  const rights = [...(question.pairs ?? []).map((pair) => pair.right)].sort();

  return (
    <div className="matching-list">
      {(question.pairs ?? []).map((pair) => (
        <label className="match-row" key={pair.left}>
          <span>{pair.left}</span>
          <select
            value={value[pair.left] ?? ""}
            disabled={disabled}
            onChange={(event) => onChange({ ...value, [pair.left]: event.target.value })}
          >
            <option value="">בחר תפקיד</option>
            {rights.map((right) => (
              <option key={right} value={right}>
                {right}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
