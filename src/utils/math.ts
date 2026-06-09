import katex from 'katex';

export function renderMathInText(text: string): string {
  // First handle display math $$...$$
  let result = text.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return _;
    }
  });
  // Then handle inline math $...$ — avoids already-replaced HTML
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
