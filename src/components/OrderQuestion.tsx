import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useMemo } from "react";
import type { Question } from "../types";

type Props = {
  question: Question;
  value: string[];
  disabled?: boolean;
  onChange: (value: string[]) => void;
};

export function OrderQuestion({ question, value, disabled, onChange }: Props) {
  const initialItems = useMemo(() => [...(question.items ?? [])].sort(() => Math.random() - 0.5), [question.items]);
  const items = value.length ? value : initialItems;

  useEffect(() => {
    if (!value.length && initialItems.length) {
      onChange(initialItems);
    }
  }, [initialItems, onChange, value.length]);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const next = [...items];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next);
  }

  return (
    <ol className="ordering-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          <span>{item}</span>
          <div className="mini-actions">
            <button type="button" onClick={() => move(index, -1)} disabled={disabled || index === 0} aria-label="העבר למעלה">
              <ArrowUp />
            </button>
            <button type="button" onClick={() => move(index, 1)} disabled={disabled || index === items.length - 1} aria-label="העבר למטה">
              <ArrowDown />
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}
