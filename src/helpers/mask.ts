export function sanitizeName(value: string) {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}

export function sanitizeUsername(value: string) {
  return value.replace(/[^a-zA-Z0-9_]/g, '');
}

export function sanitizeEmail(value: string) {
  return value.trim();
}