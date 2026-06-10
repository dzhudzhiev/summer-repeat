import { useState } from 'react';
import katex from 'katex';
import type { SelfCheckQuestion } from '../content/types';

function renderMath(text: string): string {
  // Convert markdown bold **text** to <strong> before KaTeX
  let result = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Handle display math $$...$$
  result = result.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return _;
    }
  });
  // Handle inline math $...$
  return result.replace(/\$(.+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return _;
    }
  });
}

interface SelfCheckProps {
  questions: SelfCheckQuestion[];
  onComplete: (correct: number, total: number) => void;
  initialProgress?: { selfCheckCorrect: number; selfCheckTotal: number };
}

export function SelfCheck({ questions, onComplete, initialProgress }: SelfCheckProps) {
  const initSubmitted = (initialProgress?.selfCheckTotal ?? 0) > 0;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(initSubmitted);

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const fromContext = submitted && Object.keys(answers).length === 0 && initialProgress;

  const correct = submitted
    ? Object.keys(answers).length === 0 && initialProgress
      ? initialProgress.selfCheckCorrect
      : questions.filter(
          (q, i) => answers[i]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
        ).length
    : 0;

  const handleSubmit = () => {
    setSubmitted(true);
    const c = questions.filter(
      (q, i) => answers[i]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
    ).length;
    onComplete(c, questions.length);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const resultLabel = (() => {
    if (!submitted) return '';
    const ratio = correct / questions.length;
    if (ratio === 1) return 'Отлично!';
    if (ratio >= 0.7) return 'Хорошо';
    return 'Стоит повторить теорию';
  })();

  return (
    <div className="self-check">
      <h4 className="block-title">Самопроверка</h4>
      <p className="block-desc">Ответьте на вопросы. Если всё верно — теорию можно пропустить.</p>

      {questions.map((q, i) => (
        <div key={i} className={`self-check-question ${submitted && !fromContext ? (answers[i]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ? 'correct' : 'wrong') : ''}`}>
          <p className="question-text" dangerouslySetInnerHTML={{ __html: renderMath(`${i + 1}. ${q.question}`) }} />
          {q.options ? (
            <div className="question-options">
              {q.options.map((opt) => (
                <label key={opt} className="option-label">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => setAnswers((prev) => ({ ...prev, [i]: opt }))}
                    disabled={submitted}
                  />
                  <span dangerouslySetInnerHTML={{ __html: renderMath(opt) }} />
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="question-input"
              value={answers[i] || ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
              disabled={submitted}
              placeholder="Введите ответ..."
            />
          )}
          {submitted && answers[i]?.trim().toLowerCase() !== q.correctAnswer.trim().toLowerCase() && (
            <p className="correct-answer">Правильный ответ: <span dangerouslySetInnerHTML={{ __html: renderMath(q.correctAnswer) }} /></p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!allAnswered}>
          Проверить
        </button>
      ) : (
        <div className="self-check-result">
          <p className={`self-check-summary ${correct === questions.length ? 'summary-perfect' : correct / questions.length >= 0.7 ? 'summary-good' : 'summary-poor'}`}>
            {correct} / {questions.length} — {resultLabel}
          </p>
          <button className="btn btn-secondary" onClick={handleRetry}>
            Пройти заново
          </button>
        </div>
      )}
    </div>
  );
}
