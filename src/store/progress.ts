import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SubjectProgress {
  selfCheckCorrect: number;
  selfCheckTotal: number;
  practiceDone: boolean;
  starTaskDone: boolean;
}

export interface DayProgress {
  completed: boolean;
  mixedPracticeDone: boolean;
  tab0: SubjectProgress;
  tab1: SubjectProgress;
}

export type ProgressMap = Record<number, DayProgress>;

const EMPTY_SUBJECT: SubjectProgress = {
  selfCheckCorrect: 0,
  selfCheckTotal: 0,
  practiceDone: false,
  starTaskDone: false,
};

const EMPTY_DAY: DayProgress = {
  completed: false,
  mixedPracticeDone: false,
  tab0: { ...EMPTY_SUBJECT },
  tab1: { ...EMPTY_SUBJECT },
};

interface ProgressStore {
  days: ProgressMap;
  getDay: (day: number) => DayProgress;
  updateTab: (day: number, tabIndex: number, update: Partial<SubjectProgress>) => void;
  updateDay: (day: number, update: Partial<DayProgress>) => void;
  reset: () => void;
}

function migrateDays(rawDays: Record<string, any>): ProgressMap {
  const result: ProgressMap = {};
  for (const [key, value] of Object.entries(rawDays)) {
    const day = Number(key);
    if (isNaN(day)) continue;

    if ('tab0' in value) {
      result[day] = {
        completed: value.completed ?? false,
        mixedPracticeDone: value.mixedPracticeDone ?? false,
        tab0: { ...EMPTY_SUBJECT, ...value.tab0 },
        tab1: { ...EMPTY_SUBJECT, ...value.tab1 },
      };
    } else {
      // Old flat format — migrate to tab0
      result[day] = {
        completed: value.completed ?? false,
        mixedPracticeDone: value.mixedPracticeDone ?? false,
        tab0: {
          selfCheckCorrect: value.selfCheckCorrect ?? 0,
          selfCheckTotal: value.selfCheckTotal ?? 0,
          practiceDone: value.practiceDone ?? false,
          starTaskDone: value.starTaskDone ?? false,
        },
        tab1: { ...EMPTY_SUBJECT },
      };
    }
  }
  return result;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      days: {},

      getDay: (day) => {
        const raw = get().days[day];
        if (!raw) return { ...EMPTY_DAY, tab0: { ...EMPTY_SUBJECT }, tab1: { ...EMPTY_SUBJECT } };
        return {
          completed: raw.completed,
          mixedPracticeDone: raw.mixedPracticeDone,
          tab0: { ...EMPTY_SUBJECT, ...raw.tab0 },
          tab1: { ...EMPTY_SUBJECT, ...raw.tab1 },
        };
      },

      updateTab: (day, tabIndex, update) => {
        set((state) => {
          const tabKey = tabIndex === 0 ? 'tab0' : 'tab1';
          const existing = state.days[day];
          const base = existing
            ? { ...existing, tab0: { ...EMPTY_SUBJECT, ...existing.tab0 }, tab1: { ...EMPTY_SUBJECT, ...existing.tab1 } }
            : { ...EMPTY_DAY, tab0: { ...EMPTY_SUBJECT }, tab1: { ...EMPTY_SUBJECT } };

          const updatedTab = { ...base[tabKey], ...update };
          const otherTabKey = tabIndex === 0 ? 'tab1' : 'tab0';
          const otherTab = base[otherTabKey];

          const bothDone =
            updatedTab.selfCheckTotal > 0 &&
            updatedTab.selfCheckCorrect === updatedTab.selfCheckTotal &&
            otherTab.selfCheckTotal > 0 &&
            otherTab.selfCheckCorrect === otherTab.selfCheckTotal;

          return {
            days: {
              ...state.days,
              [day]: {
                ...base,
                completed: bothDone || base.completed,
                [tabKey]: updatedTab,
              },
            },
          };
        });
      },

      updateDay: (day, update) => {
        set((state) => {
          const existing = state.days[day];
          const base = existing
            ? { ...existing, tab0: { ...EMPTY_SUBJECT, ...existing.tab0 }, tab1: { ...EMPTY_SUBJECT, ...existing.tab1 } }
            : { ...EMPTY_DAY, tab0: { ...EMPTY_SUBJECT }, tab1: { ...EMPTY_SUBJECT } };
          return {
            days: {
              ...state.days,
              [day]: { ...base, ...update },
            },
          };
        });
      },

      reset: () => set({ days: {} }),
    }),
    {
      name: 'erdni-progress',
      merge: (persisted, current) => {
        if (!persisted) return current;
        const p = persisted as Record<string, any>;

        // Old format: keys are day numbers directly
        const hasDayKeys = Object.keys(p).some((k) => /^\d+$/.test(k));
        if (hasDayKeys) {
          return { ...current, days: migrateDays(p) };
        }

        // New format after first persist: { days: { ... } }
        if (p.days && typeof p.days === 'object') {
          return { ...current, days: migrateDays(p.days) };
        }

        return current;
      },
    }
  )
);
