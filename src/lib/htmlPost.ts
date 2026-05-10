export type ExtractedHtml = { styleHtml: string; bodyHtml: string };

export function extractStyleAndBody(html: string): ExtractedHtml {
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((m) => m[1])
    .join("\n");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  return { styleHtml: styles, bodyHtml: body };
}

/**
 * Lightly scope embedded post CSS so its body/html resets and font-family
 * declarations only affect the post container, not the rest of the site.
 */
export function scopeCss(css: string, scope: string): string {
  return css
    .replace(/(^|\})\s*body\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*html\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*:root\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*\*\s*\{/g, `$1 ${scope} * {`);
}
