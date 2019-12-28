import { Observable } from './lib';

let handler: NodeJS.Timeout | null;

let timer = 0;

export const timerObservable = new Observable<number>();

export function resetTimer(time: number) {
  timer = time;
}

export function startTimer() {
  if (!handler) {
    handler = setInterval(timerTick, 1000);
  }
}

function timerTick() {
  timer--;
  if (timer <= 0) {
    pauseTimer();
  }
  timerObservable.notify(timer);
}

export function pauseTimer() {
  if (handler) {
    clearInterval(handler);
    handler = null;
  }
}
