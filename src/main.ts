import * as lib from './lib';
import * as timer from './timer';
import * as view from '../view';

// init sass
import '../sass/style.scss';
// init web components
import '../view';

// app state
type typeState = {
  pokemonNames: { [key: number]: string };
  movingPokemons: view.MovingPokemon[];
  selectedPokemon?: view.MovingPokemon;
  score?: view.typeScore;
  highScores: view.typeScore[];
};
const state: typeState = {
  pokemonNames: {},
  movingPokemons: [],
  highScores: [],
};

const config = {
  // api endpoint that provides the pokemon names. if it changes, see 'sanitize config' on init().
  url: `https://pokeapi.co/api/v2/pokemon/?limit=492`,
  // numbers of pokemons to play with. Must match 'limit' on url query. For easy games, try a lower size (ex:100)
  size: 492,
};

const DOM = {
  getBoardSection: () => document.getElementById('board')!,
  getBoardContainer: () => document.getElementById('board-container')!,
  getInfo: () => document.getElementById('info')!,
  getPlayContainer: () => document.getElementById('play-container')!,
  getScore: () =>
    <view.CurrentScore>document.getElementsByTagName('current-score')[0],
  getMyIntro: () => <view.MyIntro>document.getElementsByTagName('my-intro')[0],
  getPlayButton: () =>
    <view.PlayButton>document.getElementsByTagName('play-button')[0],
  getCounterClock: () =>
    <view.CounterClock>document.getElementsByTagName('counter-clock')[0],
  getPlayArea: () =>
    <view.PlayArea>document.getElementsByTagName('play-area')[0],
};

/**
 * General error handling
 */
const error = (err: any) => {
  console.error(err);
  lib.cleanChildElements(DOM.getPlayArea());
  lib.cleanChildElements(DOM.getInfo());
  DOM.getPlayButton().hidden = true;
  DOM.getInfo().appendChild(new view.SleepPokemon());
};

// What happens when the app loads
const init = async () => {
  // sanitize config
  const urlSize = +config.url.split('=')[1];
  if (urlSize !== config.size) {
    error(new Error('config.size does not equals limit param on config.url'));
    return;
  }
  if (config.size > 492 || config.size < 49) {
    error(new Error('config.size must be between 49 - 492'));
    return;
  }
  // fetch all pokemon names from pokeApi
  await fetch(config.url)
    .then((res) => res.json())
    .then((data) => {
      data.results.map((pokemon: any) => {
        const _ = pokemon.url.split('/');
        _.pop();
        const id = _.pop();
        state.pokemonNames[id] = pokemon.name;
      });
    })
    .catch((err) => {
      error(err);
      return;
    });
  DOM.getMyIntro().onClickObservable.subscribe(showHighScores);
  DOM.getPlayButton().onClickObservable.subscribe(startGame);
  timer.timerObservable.subscribe((secs) => {
    DOM.getCounterClock().counter = secs;
    if (secs === 0) {
      gameOver(0);
    }
  });
  timer.timerObservable.subscribe(movePokemonsTick);
  const highScores = localStorage.getItem('scores');
  if (highScores) {
    state.highScores = JSON.parse(highScores);
  }
};
lib.onLoadDocument(init);

const startGame = () => {
  state.score = { catch: 0, flee: 0 };
  DOM.getScore().catch = 0;
  DOM.getScore().flee = 0;
  lib.cleanChildElements(DOM.getInfo());
  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  state.movingPokemons = [];
  const selectPokemons = lib.generateRandomNumbers(1, config.size, 49);
  for (let i = 0; i < 49; i++) {
    const pokemon = new view.MovingPokemon(selectPokemons[i]);
    pokemon.onClickObservable.subscribe(selectPokemonOnBoard);
    state.movingPokemons.push(pokemon);
    boardContainer.appendChild(pokemon);
  }
  DOM.getBoardSection().insertBefore(boardContainer, DOM.getInfo());
  timer.resetTimer(200);
  timer.startTimer();
  DOM.getCounterClock().initCountdown();
};

const movePokemonsTick = (secs: number) => {
  const totalPlayedPokemons = state.score!.catch + state.score!.flee;
  if (totalPlayedPokemons === 49) {
    timer.pauseTimer();
    gameOver(secs);
    return;
  }
  if (secs > 0) {
    const pokemonsToMove = lib.generateRandomNumbers(0, 48, 35);
    pokemonsToMove.map((nr) => {
      (<view.MovingPokemon>(
        DOM.getBoardContainer().childNodes[nr]
      )).toggleFrame();
    });
  }
};

const selectPokemonOnBoard = (pokemon: view.MovingPokemon) => {
  state.selectedPokemon = pokemon;
  const initPokeToChose = [pokemon.number];
  if (pokemon.number > 1) initPokeToChose.push(pokemon.number - 1);
  if (pokemon.number < config.size) initPokeToChose.push(pokemon.number + 1);
  let pokemonsToChose = lib.generateRandomNumbers(
    1,
    config.size,
    6,
    initPokeToChose
  );
  pokemonsToChose = lib.shuffle(pokemonsToChose);
  const namedPokemons = pokemonsToChose.map((nr) => state.pokemonNames[nr]);
  lib.cleanChildElements(DOM.getPlayContainer());
  const playArea = new view.PlayArea(pokemon.number, namedPokemons);
  playArea.onClickObservable.subscribe(handleGuess);
  DOM.getPlayContainer().appendChild(playArea);
};

const handleGuess = (guess: string) => {
  const answer = state.pokemonNames[state.selectedPokemon!.number];
  DOM.getPlayArea().highlight(guess, answer);
  const isCorrect = answer === guess;
  state.selectedPokemon!.hidePokemon(isCorrect);
  if (isCorrect) {
    state.score!.catch++;
    DOM.getScore().catch = state.score!.catch;
  } else {
    state.score!.flee++;
    DOM.getScore().flee = state.score!.flee;
  }
};

const gameOver = (timeLeft: number) => {
  state.score!.timeLeft = timeLeft;
  state.highScores.push(state.score!);
  localStorage.setItem('scores', JSON.stringify(state.highScores));
  showHighScores();
};

const showHighScores = () => {
  lib.cleanChildElements(DOM.getInfo());
  lib.cleanChildElements(DOM.getPlayContainer());
  if (DOM.getBoardContainer()) {
    DOM.getBoardSection().removeChild(DOM.getBoardContainer());
  }
  const highScores = new view.HighScores(state.highScores);
  DOM.getInfo().appendChild(highScores);
  DOM.getPlayButton().show();
};
