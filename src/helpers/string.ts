export function pluralize(
  string: string,
  count: number,
  term: string = "s"
): string {
  return count < -1 || count > 1 ? string.concat(term) : string;
}
