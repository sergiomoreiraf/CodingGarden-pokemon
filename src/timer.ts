// Controls the timer countdown and provides subscriptions for timer tick (observer pattern).

import { Observable } from './lib/observable';

// Controls the timer event loop
let handler: number;

let timer = 60;

/**
 * Holds observers to get notified when times ticks for a sec
 */
export const timerObserver = new Observable<number>();

/**
 * Reset timer to 1 minute
 */
export function resetTimer() {
  timer = 60;
}

/**
 * Resume (start) timer
 */
export function startTimer() {
  if (!handler) {
    handler = setInterval(timerTick, 1000);
  }
}

// What happens when 1 sec tick
function timerTick() {
  console.log(timer);
  timer--;
  timerObserver.notify(timer);
  if (timer <= 0) {
    pauseTimer();
  }
}

/**
 * Pause the timer.
 */
export function pauseTimer() {
  if (handler) {
    clearInterval(handler);
  }
}
