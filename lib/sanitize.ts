import DOMPurify from 'isomorphic-dompurify';

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'img', 'pre', 'code', 'blockquote', 'span', 'div'
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style', 'target', 'rel'],
  // Allow data: URIs for base64 encoded images
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$)|data:image\/)/i,
};

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  // Replace white-space: pre with white-space: pre-wrap to force line wrapping inside IDE background containers
  const processed = html.replace(/white-space\s*:\s*pre(;|\b|")/gi, 'white-space: pre-wrap$1');
  return DOMPurify.sanitize(processed, SANITIZE_CONFIG);
}
