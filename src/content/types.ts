export interface SelfCheckQuestion {
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface Task {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  solution: string;
  hint?: string;
  mode?: 'solve' | 'explain';
}

export type Subject = 'math' | 'physics' | 'chemistry' | 'russian';

export interface SubjectBlockData {
  subject: Subject;
  title: string;
  selfCheck: SelfCheckQuestion[];
  theory: string;
  practice: Task[];
  starTask?: Task;
}

export interface DayData {
  day: number;
  week: number;
  subjects: [SubjectBlockData, SubjectBlockData];
  mixedPractice?: Task[];
}

export type SubjectColors = Record<Subject, string>;
export type SubjectLabels = Record<Subject, string>;

export const SUBJECT_COLORS: SubjectColors = {
  math: '#2563eb',
  physics: '#7c3aed',
  chemistry: '#059669',
  russian: '#dc2626',
};

export const SUBJECT_LABELS: SubjectLabels = {
  math: 'Математика',
  physics: 'Физика',
  chemistry: 'Химия',
  russian: 'Русский язык',
};

export const SUBJECT_ORDER: [Subject, Subject, Subject, Subject] = [
  'math',
  'physics',
  'chemistry',
  'russian',
];

export const WEEK_SCHEDULE: Record<number, [Subject, Subject]> = {
  1: ['math', 'russian'],
  2: ['physics', 'russian'],
  3: ['math', 'chemistry'],
  4: ['physics', 'russian'],
  5: ['math', 'chemistry'],
};
