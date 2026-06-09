import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { renderMathInText } from '../utils/math';
import type { Task } from '../content/types';

interface PracticeBlockProps {
  tasks: Task[];
  done?: boolean;
  onProgress?: (done: boolean) => void;
}

export function PracticeBlock({ tasks, done = false, onProgress }: PracticeBlockProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="practice-block">
      <h4 className="block-title">Практика</h4>
      {tasks.map((task) => (
        <div key={task.id} className={`task-card task-${task.difficulty}`}>
          <div className="task-header">
            <span className={`task-difficulty difficulty-${task.difficulty}`}>
              {task.difficulty === 'easy' ? '●' : task.difficulty === 'medium' ? '●●' : '●●●'}
            </span>
            <span className="task-id">#{task.id}</span>
          </div>
          <div className="task-text markdown-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {renderMathInText(task.text)}
            </ReactMarkdown>
          </div>
          {task.hint && (
            <details className="task-hint">
              <summary>Подсказка</summary>
              <div className="markdown-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {renderMathInText(task.hint)}
                </ReactMarkdown>
              </div>
            </details>
          )}
          <button
            className="btn btn-sm"
            onClick={() => toggle(task.id)}
          >
            {expanded[task.id] ? 'Скрыть решение' : 'Показать решение'}
          </button>
          {expanded[task.id] && (
            <div className="task-solution markdown-content">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {renderMathInText(task.solution)}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
      {onProgress && (
        <div className="practice-actions">
          {!done ? (
            <button className="btn btn-primary btn-sm" onClick={() => onProgress(true)}>
              ✓ Отметить выполненным
            </button>
          ) : (
            <span className="badge badge-practice-done">Практика выполнена ✓</span>
          )}
        </div>
      )}
    </div>
  );
}
