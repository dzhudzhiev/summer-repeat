import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { renderMathInText } from '../utils/math';

interface TheoryBlockProps {
  content: string;
}

export function TheoryBlock({ content }: TheoryBlockProps) {
  return (
    <div className="theory-block">
      <h4 className="block-title">Теория</h4>
      <div className="theory-content markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {renderMathInText(content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
