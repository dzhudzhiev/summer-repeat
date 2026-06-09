import { WeekGrid } from './WeekGrid';
import { ProgressBar } from './ProgressBar';
import type { ProgressMap } from '../store/progress';

interface CalendarViewProps {
  progress: ProgressMap;
  completedDays: number;
  totalDays: number;
}

export function CalendarView({ progress, completedDays, totalDays }: CalendarViewProps) {
  const totalWeeks = Math.ceil(totalDays / 5);

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>Летний план обучения</h2>
        <p className="calendar-subtitle">
          Июнь — Август · 12 недель · 4 предмета
        </p>
        {totalDays > 0 && (
          <ProgressBar
            completed={completedDays}
            total={totalDays}
            label="Общий прогресс"
          />
        )}
      </div>
      <div className="calendar-subheader">
        <span>Недели</span>
        <span className="calendar-legend">
          <span className="legend-done">✓</span> пройдено
          <span className="legend-star">★</span> звездная задача
        </span>
      </div>

      <div className="calendar-weeks">
        {Array.from({ length: totalWeeks }, (_, i) => (
          <WeekGrid key={i + 1} week={i + 1} progress={progress} />
        ))}
      </div>
    </div>
  );
}
