export * from './moving-pokemon/moving-pokemon';
export * from './play-button/play-button';
export * from './play-area/play-area';
export * from './counter-clock/counter-clock';
export * from './current-score/current-score';
export * from './high-scores/high-scores';
export * from './my-intro/my-intro';
export * from './sleep-pokemon/sleep-pokemon';

import {
  MovingPokemon,
  PlayButton,
  CounterClock,
  PlayArea,
  CurrentScore,
  HighScores,
  MyIntro
} from './';
import { SleepPokemon } from './sleep-pokemon/sleep-pokemon';

customElements.define('moving-pokemon', MovingPokemon);
customElements.define('play-button', PlayButton);
customElements.define('play-area', PlayArea);
customElements.define('counter-clock', CounterClock);
customElements.define('current-score', CurrentScore);
customElements.define('high-scores', HighScores);
customElements.define('my-intro', MyIntro);
customElements.define('sleep-pokemon', SleepPokemon);
