import { useState } from 'react';
import { useProgressStore } from '../store/progress';
import { SelfCheck } from './SelfCheck';
import { TheoryBlock } from './TheoryBlock';
import { PracticeBlock } from './PracticeBlock';
import { StarTask } from './StarTask';
import type { SubjectBlockData } from '../content/types';

interface SubjectBlockProps {
  data: SubjectBlockData;
  day: number;
  tabIndex: number;
}

export function SubjectBlock({ data, day, tabIndex }: SubjectBlockProps) {
  const tabKey = tabIndex === 0 ? 'tab0' : 'tab1';
  const days = useProgressStore((s) => s.days);
  const updateTab = useProgressStore((s) => s.updateTab);

  // Derive from store (single source of truth)
  const dp = days[day];
  const tab = dp?.[tabKey] ?? { selfCheckCorrect: 0, selfCheckTotal: 0, practiceDone: false, starTaskDone: false };
  const selfCheckPassed = tab.selfCheckTotal > 0 && tab.selfCheckCorrect === tab.selfCheckTotal;
  const selfCheckSubmitted = tab.selfCheckTotal > 0;
  const practiceDone = tab.practiceDone;
  const starTaskDone = tab.starTaskDone;

  // Session-only local state (not persisted)
  const [theoryRead, setTheoryRead] = useState(selfCheckPassed);
  const [resetKey, setResetKey] = useState(0);

  const handleSelfCheck = (correct: number, total: number) => {
    updateTab(day, tabIndex, { selfCheckCorrect: correct, selfCheckTotal: total });
    if (correct === total) {
      setTheoryRead(true);
    }
  };

  const handlePracticeDone = (done: boolean) => {
    updateTab(day, tabIndex, { practiceDone: done });
  };

  const handleStarDone = () => {
    updateTab(day, tabIndex, { starTaskDone: true });
  };

  const theoryDone = selfCheckPassed || theoryRead;
  const hasStar = !!data.starTask;
  const steps = [
    { label: 'Самопроверка', done: selfCheckPassed },
    { label: 'Теория', done: theoryDone },
    { label: 'Практика', done: practiceDone },
    ...(hasStar ? [{ label: '★', done: starTaskDone }] : []),
  ];

  return (
    <div className="subject-block">
      <h3 className="subject-block-title">{data.title}</h3>

      <div className="step-indicator">
        {steps.map((s, i) => (
          <div key={s.label} className={`step-dot ${s.done ? 'step-done' : ''}`}>
            <span className="step-number">{s.done ? '✓' : i + 1}</span>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      <SelfCheck
        key={resetKey}
        questions={data.selfCheck}
        onComplete={handleSelfCheck}
        initialProgress={selfCheckSubmitted ? tab : undefined}
      />

      <TheoryBlock content={data.theory} />

      {!selfCheckPassed && !theoryRead && (
        <button className="btn btn-sm theory-done-btn" onClick={() => setTheoryRead(true)}>
          Прочитал ✓
        </button>
      )}
      {!selfCheckPassed && theoryRead && (
        <span className="badge badge-practice-done">Прочитано ✓</span>
      )}

      <PracticeBlock tasks={data.practice} done={practiceDone} onProgress={handlePracticeDone} />

      {data.starTask && (
        <StarTask task={data.starTask} done={starTaskDone} onComplete={handleStarDone} />
      )}

      <button className="btn btn-sm btn-reset" onClick={() => {
        setTheoryRead(false);
        setResetKey((k) => k + 1);
        updateTab(day, tabIndex, {
          selfCheckCorrect: 0,
          selfCheckTotal: 0,
          practiceDone: false,
          starTaskDone: false,
        });
      }}>
        Сбросить
      </button>
    </div>
  );
}
