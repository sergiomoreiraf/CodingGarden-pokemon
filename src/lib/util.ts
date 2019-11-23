/**
 * Handler to execute a function when document loads.
 */
export function onLoadDocument(fn: () => void) {
  document.addEventListener('DOMContentLoaded', fn, false);
}

/**
 * Computes an array of random non repeating numbers
 */
export function generateRandomNumbers(
  from: number,
  to: number,
  howMany: number,
  init: number[] = []
): number[] {
  if (to < from || howMany > to - from + 1) {
    return [];
  }
  let set = new Set<number>();
  init.map(x => set.add(x));
  // naive code: should use different approach if howMany is greater than (to-from)/2
  while (set.size < howMany) {
    const random = Math.floor(Math.random() * (to - from + 1)) + from;
    set.add(random);
  }
  let ret = [...set];
  return ret;
}
