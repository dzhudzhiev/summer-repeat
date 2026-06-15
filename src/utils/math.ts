import katex from 'katex';

export function renderMathInText(text: string): string {
  // Convert markdown bold **text** to <strong> before KaTeX
  let result = text.replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>');
  // Convert markdown headings ## → <h2>, ### → <h3>, #### → <h4>
  result = result.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  result = result.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  result = result.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  // Convert horizontal rule --- to <hr>
  result = result.replace(/^---$/gm, '<hr>');
  // Handle display math $$...$$
  result = result.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return _;
    }
  });
  // Handle inline math $...$ — avoids already-replaced HTML
  result = result.replace(/\$(.+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return _;
    }
  });
  return result;
}
