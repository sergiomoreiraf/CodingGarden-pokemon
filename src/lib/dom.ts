export function onLoadDocument(fn: () => void) {
  document.addEventListener('DOMContentLoaded', fn, false);
}

export function cleanChildElements(elm: HTMLElement) {
  while (elm.firstChild) {
    elm.removeChild(elm.firstChild!);
  }
}
