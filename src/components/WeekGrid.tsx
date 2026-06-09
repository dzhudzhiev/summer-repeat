import { DayCard } from './DayCard';
import { getDaysInRange } from '../content';
import { SUBJECT_LABELS, SUBJECT_COLORS } from '../content/types';
import type { ProgressMap } from '../store/progress';

interface WeekGridProps {
  week: number;
  progress: ProgressMap;
}

export function WeekGrid({ week, progress }: WeekGridProps) {
  const dayStart = (week - 1) * 5 + 1;
  const dayEnd = week * 5;
  const days = getDaysInRange(dayStart, dayEnd);

  return (
    <div className="week-grid">
      <h2 className="week-title">Неделя {week}</h2>
      <div className="week-days">
        {days.map((day) => {
          const dp = progress[day.day];
          return (
            <DayCard
              key={day.day}
              day={day}
              labels={SUBJECT_LABELS}
              colors={SUBJECT_COLORS}
              completed={dp?.completed}
              starTaskDone={dp?.tab0?.starTaskDone || dp?.tab1?.starTaskDone}
            />
          );
        })}
      </div>
    </div>
  );
}
