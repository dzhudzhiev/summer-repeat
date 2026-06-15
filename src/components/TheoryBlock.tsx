import { renderMathInText } from '../utils/math';

interface TheoryBlockProps {
  content: string;
}

export function TheoryBlock({ content }: TheoryBlockProps) {
  const html = renderMathInText(content);
  return (
    <div className="theory-block">
      <h4 className="block-title">Теория</h4>
      <div
        className="theory-content markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
