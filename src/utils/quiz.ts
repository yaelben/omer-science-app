import type { AnswerValue, CheckedAnswer, Question } from "../types";

export function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getQuestionScore(question: Question, value: AnswerValue | undefined): CheckedAnswer {
  if (value === undefined) {
    return { isCorrect: false, correctAnswer: formatCorrectAnswer(question) };
  }

  if (question.type === "matching") {
    const map = value as Record<string, string>;
    const isCorrect = (question.pairs ?? []).every((pair) => map[pair.left] === pair.right);
    return { isCorrect, correctAnswer: formatCorrectAnswer(question) };
  }

  if (question.type === "ordering") {
    const selected = Array.isArray(value) ? value : [];
    const expected = question.answer as string[];
    return {
      isCorrect: selected.length === expected.length && expected.every((item, index) => selected[index] === item),
      correctAnswer: expected.join(" ← "),
    };
  }

  if (question.type === "multiple_select") {
    const selected = Array.isArray(value) ? [...value].sort() : [];
    const expected = [...(question.answer as string[])].sort();
    return {
      isCorrect: selected.length === expected.length && selected.every((item, index) => item === expected[index]),
      correctAnswer: expected.join(", "),
    };
  }

  return {
    isCorrect: value === question.answer,
    correctAnswer: formatCorrectAnswer(question),
  };
}

export function formatCorrectAnswer(question: Question): string {
  if (question.type === "true_false") {
    return question.answer ? "נכון" : "לא נכון";
  }

  if (question.type === "matching") {
    return (question.pairs ?? []).map((pair) => `${pair.left} = ${pair.right}`).join(", ");
  }

  if (question.type === "ordering") {
    return (question.answer as string[]).join(" ← ");
  }

  if (Array.isArray(question.answer)) {
    return question.answer.join(", ");
  }

  return String(question.answer ?? "");
}

export function buildExamQuestions(questions: Question[], count = 18): Question[] {
  const byType = new Map<string, Question[]>();
  questions.forEach((question) => {
    byType.set(question.type, [...(byType.get(question.type) ?? []), question]);
  });

  const required = Array.from(byType.values()).flatMap((group) => shuffle(group).slice(0, 1));
  const rest = shuffle(questions.filter((question) => !required.includes(question)));
  return shuffle([...required, ...rest].slice(0, Math.min(count, questions.length)));
}
