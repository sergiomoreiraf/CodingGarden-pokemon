// Controls the timer countdown and provides subscriptions for timer tick (observer pattern).

import * as storage from './storage';
import { Observable } from './observable';

// Controls the timer event loop
let timer: number;

/**
 * Holds observers to get notified when times ticks for a sec
 */
export const timerObserver = new Observable<number>();

/**
 * Reset timer to 1 minute
 */
export function resetTimer() {
  storage.set(storage.items.secs, 60);
}

/**
 * Resume (start) timer
 */
export function startTimer() {
  if (!timer) {
    timer = setInterval(timerTick, 1000);
  }
}

// What happens when 1 sec tick
function timerTick() {
  let secs = storage.get(storage.items.secs);
  secs--;
  storage.set(storage.items.secs, secs);
  timerObserver.notify(secs);
  if (secs <= 0) {
    pauseTimer();
    resetTimer();
  }
}

/**
 * Pause the timer.
 */
export function pauseTimer() {
  if (timer) {
    clearInterval(timer);
  }
}
