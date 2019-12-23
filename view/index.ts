export * from './moving-pokemon/moving-pokemon';
export * from './play-button/play-button';
export * from './play-area/play-area';
export * from './counter-clock/counter-clock';
export * from './current-score/current-score';

import {
  MovingPokemon,
  PlayButton,
  CounterClock,
  PlayArea,
  CurrentScore
} from './';

customElements.define('moving-pokemon', MovingPokemon);
customElements.define('play-button', PlayButton);
customElements.define('play-area', PlayArea);
customElements.define('counter-clock', CounterClock);
customElements.define('current-score', CurrentScore);
