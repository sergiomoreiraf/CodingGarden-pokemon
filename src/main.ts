import { onLoadDocument, generateRandomNumbers } from './lib';
import * as timer from './timer';
import * as view from '../view';

// init sass
import '../sass/style.scss';
// init web components
import '../view';

// Initial app state
type typeState = {
  pokemonNames: { [key: number]: string };
  movingPokemons: view.MovingPokemon[];
  error: {
    hasError: boolean;
  };
};
const state: typeState = {
  pokemonNames: {},
  movingPokemons: [],
  error: {
    hasError: false
  }
};

const config = {
  // api endpoint that provides the pokemon names
  url: `https://pokeapi.co/api/v2/pokemon/?limit=10`,
  // numbers of pokemons to play with. Must match 'limit' on url query
  size: 100
};

const DOM = {
  getBoard: () => document.getElementById('board')!,
  getPlayButton: () =>
    <view.PlayButton>document.getElementsByTagName('play-button')[0],
  getCounterClock: () =>
    <view.CounterClock>document.getElementsByTagName('counter-clock')[0],
  getDomPlayArea: () =>
    <view.PlayArea>document.getElementsByTagName('play-area')[0]
};

/**
 * General error handling
 */
export const error = (err: any) => {
  console.error(err);
  state.error.hasError = true;
};

// What happens when the app loads
const init = async () => {
  await fetchPokemons();
  setInitialHandlers();
};
onLoadDocument(init);

// fetch pokemon names from pokeApi
const fetchPokemons = async () => {
  await fetch(config.url)
    .then(res => res.json())
    .then(data => {
      data.results.map((pokemon: any) => {
        const _ = pokemon.url.split('/');
        _.pop();
        const id = _.pop();
        state.pokemonNames[id] = pokemon.name;
      });
    })
    .catch(err => {
      error(err);
    });
};

// What happens when user interact with app
const setInitialHandlers = () => {
  // play button plays a game
  DOM.getPlayButton().onCLickSubscribe(playGame);
  // game interface updates on timer tick
  timer.timerObserver.subscribe(secs => {
    DOM.getCounterClock().counter = secs!;
    if (secs === 0) {
      DOM.getPlayButton().show();
    }
  });
  // also it moves pokemon on timer tick
  timer.timerObserver.subscribe(movePokemons);
};

const playGame = () => {
  generateBoard();
  timer.resetTimer();
  timer.startTimer();
};

const generateBoard = () => {
  // clear the board
  while (DOM.getBoard().firstChild) {
    DOM.getBoard().removeChild(DOM.getBoard().firstChild!);
  }
  // generate random pokemons and add to board
  const selectPokemons = generateRandomNumbers(1, config.size, 49);
  state.movingPokemons = [];
  for (let i = 0; i < 49; i++) {
    const pokemon = new view.MovingPokemon(selectPokemons[i]);
    state.movingPokemons.push(pokemon);
    DOM.getBoard().appendChild(pokemon);
  }
};

// Handles pokemon animation by toggle the frame.
const movePokemons = () => {
  const pokemonsToMove = generateRandomNumbers(0, 48, 35);
  pokemonsToMove.map(nr => {
    (<view.MovingPokemon>DOM.getBoard().childNodes[nr]).toggleFrame();
  });
};
