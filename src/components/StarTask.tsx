import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { renderMathInText } from '../utils/math';
import type { Task } from '../content/types';

interface StarTaskProps {
  task: Task;
  done?: boolean;
  onComplete?: () => void;
}

export function StarTask({ task, done: initialDone = false, onComplete }: StarTaskProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [done, setDone] = useState(initialDone);

  const handleDone = () => {
    setDone(true);
    onComplete?.();
  };

  const md = (text: string) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {renderMathInText(text)}
    </ReactMarkdown>
  );

  const isExplain = task.mode === 'explain';

  return (
    <div className="star-task">
      <h4 className="block-title star-title">★ Звёздная задача</h4>
      <p className="star-desc">
        {isExplain
          ? 'Объясни своими словами и покажи родителю.'
          : 'Эту задачу нужно показать родителю после решения.'}
      </p>
      <div className={`task-card ${isExplain ? 'task-explain' : 'task-star'}`}>
        {isExplain && (
          <span className="badge badge-explain">Объясни</span>
        )}
        <div className="task-text markdown-content">
          {md(task.text)}
        </div>
        {task.hint && (
          <details className="task-hint">
            <summary>{isExplain ? 'Идеи для ответа' : 'Подсказка'}</summary>
            <div className="markdown-content">
              {md(task.hint)}
            </div>
          </details>
        )}
        <div className="star-actions">
          <button
            className="btn btn-sm"
            onClick={() => setShowSolution((v) => !v)}
          >
            {showSolution ? 'Скрыть' : isExplain ? 'Пример ответа' : 'Показать решение'}
          </button>
          {!done ? (
            <button className="btn btn-primary btn-sm" onClick={handleDone}>
              {isExplain ? 'Объяснил ✓' : 'Задача решена ✓'}
            </button>
          ) : (
            <span className={`badge ${isExplain ? 'badge-explain-done' : 'badge-star'}`}>
              {isExplain ? 'Готово ✓' : 'Выполнено ★'}
            </span>
          )}
        </div>
        {showSolution && (
          <div className="task-solution markdown-content">
            {md(task.solution)}
          </div>
        )}
      </div>
    </div>
  );
}
