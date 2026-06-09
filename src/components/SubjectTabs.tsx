import type { Subject } from '../content/types';

interface SubjectTabsProps {
  subjects: Subject[];
  active: number;
  labels: Record<Subject, string>;
  colors: Record<Subject, string>;
  onSwitch: (index: number) => void;
}

export function SubjectTabs({ subjects, active, labels, colors, onSwitch }: SubjectTabsProps) {
  return (
    <div className="subject-tabs">
      {subjects.map((subj, i) => (
        <button
          key={subj}
          className={`subject-tab ${i === active ? 'active' : ''}`}
          style={{
            borderBottomColor: i === active ? colors[subj] : 'transparent',
            color: i === active ? colors[subj] : undefined,
          }}
          onClick={() => onSwitch(i)}
        >
          {labels[subj]}
        </button>
      ))}
    </div>
  );
}
