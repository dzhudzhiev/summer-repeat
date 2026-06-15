import katex from 'katex';

export function renderMathInText(text: string): string {
  // Convert markdown bold **text** to <strong> before KaTeX
  let result = text.replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>');
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
