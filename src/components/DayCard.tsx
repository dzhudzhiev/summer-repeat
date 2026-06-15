import { Link } from 'react-router-dom';
import type { DayData, SubjectLabels, SubjectColors } from '../content/types';

interface DayCardProps {
  day: DayData;
  labels: SubjectLabels;
  colors: SubjectColors;
  completed?: boolean;
  starTaskDone?: boolean;
}

export function DayCard({ day, labels, colors, completed, starTaskDone }: DayCardProps) {
  return (
    <Link to={`/day/${day.day}`} className={`day-card ${completed ? 'completed' : ''}`} id={`day-card-${day.day}`}>
      <div className="day-card-header">
        <span className="day-card-number">День {day.day}</span>
        <div className="day-card-badges">
          {completed && <span className="badge badge-done">✓</span>}
          {starTaskDone && <span className="badge badge-star">★</span>}
        </div>
      </div>
      <div className="day-card-subjects">
        {day.subjects.map((s) => (
          <span
            key={s.subject}
            className="day-card-subject"
            style={{ backgroundColor: colors[s.subject] + '20', color: colors[s.subject] }}
          >
            {labels[s.subject]}
          </span>
        ))}
      </div>
      <div className="day-card-titles">
        {day.subjects.map((s) => (
          <span key={s.subject} className="day-card-title">
            {s.title}
          </span>
        ))}
      </div>
    </Link>
  );
}
