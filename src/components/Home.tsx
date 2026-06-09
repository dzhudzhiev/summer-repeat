import { useProgressStore } from '../store/progress';
import { CalendarView } from './CalendarView';
import { StatsCards } from './StatsCards';
import { getTotalDays } from '../content';

export function Home() {
  const days = useProgressStore((s) => s.days);
  const resetProgress = useProgressStore((s) => s.reset);
  const totalDays = getTotalDays();

  const completed = Object.values(days).filter((d) => d.completed).length;
  const pct = totalDays > 0 ? Math.round((completed / totalDays) * 100) : 0;

  return (
    <div className="home">
      <div className="home-progress-header">
        <h2>Мой прогресс</h2>
        <div className="home-progress-ring">
          <svg viewBox="0 0 120 120" className="progress-ring-svg">
            <circle cx="60" cy="60" r="52" className="progress-ring-bg" />
            <circle
              cx="60" cy="60" r="52"
              className="progress-ring-fill"
              style={{
                strokeDasharray: `${2 * Math.PI * 52}`,
                strokeDashoffset: `${2 * Math.PI * 52 * (1 - pct / 100)}`,
              }}
            />
          </svg>
          <span className="progress-ring-text">{pct}%</span>
        </div>
        <p className="home-progress-subtitle">
          {completed} из {totalDays} дней
        </p>
      </div>

      <StatsCards />

      <CalendarView
        progress={days}
        completedDays={completed}
        totalDays={totalDays}
      />

      <div className="home-footer">
        <button className="btn btn-danger btn-sm" onClick={resetProgress}>
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
}
