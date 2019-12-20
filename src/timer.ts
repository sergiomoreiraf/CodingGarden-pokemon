import { Observable } from './lib';

let handler: NodeJS.Timeout | null;

let timer = 60;

/**
 * Holds observers to get notified when times ticks every sec
 */
export const timerObservable = new Observable<number>();

export function resetTimer() {
  timer = 60;
}

export function startTimer() {
  if (!handler) {
    handler = setInterval(timerTick, 1000);
  }
}

function timerTick() {
  timer--;
  timerObservable.notify(timer);
  if (timer <= 0) {
    pauseTimer();
  }
}

export function pauseTimer() {
  if (handler) {
    clearInterval(handler);
    handler = null;
  }
}
