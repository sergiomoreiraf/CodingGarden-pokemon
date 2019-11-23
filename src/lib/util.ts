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
  if (to < from || howMany > to - from + 1 || init.length > howMany) {
    return [];
  }

  let set = new Set<number>();
  let ret: number[];

  if (howMany + init.length <= (to - from) / 2) {
    init.map(x => set.add(x));
    while (set.size < howMany) {
      const random = Math.floor(Math.random() * (to - from + 1)) + from;
      set.add(random);
    }
    ret = [...set];
  } else {
    for (let i = from; i <= to; i++) {
      set.add(i);
    }
    while (set.size > howMany) {
      const random = Math.floor(Math.random() * (to - from + 1)) + from;
      if (init.filter(x => x === random).length === 0) set.delete(random);
    }
    ret = [...set];
  }

  return ret;
}
