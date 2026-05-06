import type { ProgressData } from "../types";

const STORAGE_KEY = "omer-science-progress-v1";

export const emptyProgress: ProgressData = {
  completedLessons: [],
  lastScore: null,
  bestScore: null,
  mistakesByTopic: {},
};

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
