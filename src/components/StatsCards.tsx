import { useProgressStore } from '../store/progress';
import { allDays } from '../content';
import { SUBJECT_LABELS, SUBJECT_COLORS, type Subject } from '../content/types';

export function StatsCards() {
  const progress = useProgressStore((s) => s.days);

  // Per-subject: count total days and completed days
  const subjectStats = {} as Record<Subject, { total: number; done: number }>;
  for (const day of allDays) {
    for (const s of day.subjects) {
      if (!subjectStats[s.subject]) {
        subjectStats[s.subject] = { total: 0, done: 0 };
      }
      subjectStats[s.subject].total++;
      if (progress[day.day]?.completed) {
        subjectStats[s.subject].done++;
      }
    }
  }

  // Star tasks solved (check both tabs)
  const starsDone = Object.values(progress).filter(
    (p) => p.tab0?.starTaskDone || p.tab1?.starTaskDone
  ).length;

  // Streak: consecutive completed days from day 1
  let streak = 0;
  for (let d = 1; d <= allDays.length; d++) {
    if (progress[d]?.completed) {
      streak++;
    } else {
      break;
    }
  }

  const subjects = Object.keys(subjectStats) as Subject[];

  return (
    <div className="stats-cards">
      <div className="stat-card stat-streak">
        <span className="stat-value">{streak}</span>
        <span className="stat-label">дней подряд</span>
      </div>

      {subjects.map((subj) => {
        const { total, done } = subjectStats[subj];
        return (
          <div
            key={subj}
            className="stat-card"
            style={{ borderTopColor: SUBJECT_COLORS[subj] }}
          >
            <span className="stat-value">
              {done}/{total}
            </span>
            <span className="stat-label">{SUBJECT_LABELS[subj]}</span>
          </div>
        );
      })}

      <div className="stat-card stat-star">
        <span className="stat-value">{starsDone}</span>
        <span className="stat-label">★ звёздных задач</span>
      </div>
    </div>
  );
}
