export function calculateTokenExpiration(dateTime: number): number {
  return Math.floor(dateTime / 1000) + Date.now();
}
