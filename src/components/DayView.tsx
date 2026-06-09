import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SubjectBlock } from './SubjectBlock';
import { SubjectTabs } from './SubjectTabs';
import { PracticeBlock } from './PracticeBlock';
import { getDay } from '../content';
import { SUBJECT_LABELS, SUBJECT_COLORS } from '../content/types';
import { useProgressStore } from '../store/progress';

export function DayView() {
  const { dayId } = useParams<{ dayId: string }>();
  const day = getDay(Number(dayId));
  const days = useProgressStore((s) => s.days);
  const updateDay = useProgressStore((s) => s.updateDay);
  const [activeTab, setActiveTab] = useState(0);

  if (!day) {
    return (
      <div className="not-found">
        <h2>День не найден</h2>
        <Link to="/" className="btn btn-primary">На главную</Link>
      </div>
    );
  }

  const dp = days[day.day];
  const completed = dp?.completed ?? false;
  const mixedPracticeDone = dp?.mixedPracticeDone ?? false;

  const prevCompleted = day.day > 1 ? (days[day.day - 1]?.completed ?? false) : false;
  const hasNext = getDay(day.day + 1) !== undefined;
  const nextCompleted = hasNext ? (days[day.day + 1]?.completed ?? false) : false;

  const subjectList = day.subjects.map((s) => s.subject);

  return (
    <div className="day-view" key={day.day}>
      <div className="day-nav">
        {day.day > 1 && (
          <Link to={`/day/${day.day - 1}`} className="btn btn-sm">
            ← {prevCompleted ? '✓ ' : ''}День {day.day - 1}
          </Link>
        )}
        <h2 className="day-view-title">День {day.day}</h2>
        {hasNext && (
          <Link to={`/day/${day.day + 1}`} className="btn btn-sm">
            {nextCompleted ? '✓ ' : ''}День {day.day + 1} →
          </Link>
        )}
      </div>

      {completed && (
        <div className="day-completed-banner">✓ День завершён</div>
      )}

      <div className="day-toolbar">
        <button className="btn btn-sm" onClick={() => window.print()}>
          Печать
        </button>
      </div>

      <SubjectTabs
        subjects={subjectList}
        active={activeTab}
        labels={SUBJECT_LABELS}
        colors={SUBJECT_COLORS}
        onSwitch={setActiveTab}
      />

      <SubjectBlock
        key={`${day.day}-${activeTab}`}
        data={day.subjects[activeTab]}
        day={day.day}
        tabIndex={activeTab}
      />

      {day.mixedPractice && (
        <div className="mixed-practice">
          <h4 className="block-title mixed-practice-title">
            Смешанная практика
          </h4>
          <p className="block-desc">
            Задачи из разных тем недели. Определите, какой метод применить.
          </p>
          <PracticeBlock
            tasks={day.mixedPractice}
            done={mixedPracticeDone}
            onProgress={(done) => {
              updateDay(day.day, { mixedPracticeDone: done } as any);
            }}
          />
        </div>
      )}
    </div>
  );
}
