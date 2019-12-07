import { onLoadDocument, generateRandomNumbers } from './lib';
import { config } from './config';
import * as timer from './timer';

import { MovingPokemon, PlayButton, CounterClock } from '../view';

// init sass
import '../sass/style.scss';
// init web components
import '../view/main';

// Initial app state
let pokemonNames: { [key: number]: string } = {};
let movingPokemons: MovingPokemon[];
let appHasError = false;

// Cache some DOM elements
const getDomBoard = () => document.getElementById('board')!;
const getDomPlayButton = () =>
  <PlayButton>document.getElementsByTagName('play-button')[0];
const getDomCounterClock = () =>
  <CounterClock>document.getElementsByTagName('counter-clock')[0];

// General error handling
export const error = () => {
  appHasError = true;
};

// What happens when the app loads
const init = async () => {
  await fetchPokemons();
  setInitialHandlers();
};
onLoadDocument(init);

// fetch pokemon names from pokeApi
const fetchPokemons = async () => {
  const url = config.pokeApi.url;
  await fetch(url)
    .then(res => res.json())
    .then(data => {
      data.results.map((pokemon: any) => {
        const _ = pokemon.url.split('/');
        _.pop();
        const id = _.pop();
        pokemonNames[id] = pokemon.name;
      });
    })
    .catch(err => {
      console.error(err);
      error();
    });
};

const setInitialHandlers = () => {
  // play button plays a game
  getDomPlayButton().onCLickSubscribe(playGame);
  // game interface updates on timer tick
  timer.timerObserver.subscribe(secs => {
    getDomCounterClock().counter = secs!;
    if (secs === 0) {
      getDomPlayButton().show();
    }
  });
  // also it moves pokemon on timer tick
  timer.timerObserver.subscribe(movePokemons);
};

// When u hit play button
const playGame = () => {
  generateBoard();
  timer.resetTimer();
  timer.startTimer();
};

const generateBoard = () => {
  // Clear the board
  while (getDomBoard().firstChild) {
    getDomBoard().removeChild(getDomBoard().firstChild!);
  }
  // generate random pokemons
  const selectPokemons = generateRandomNumbers(1, config.pokeApi.size, 49);
  movingPokemons = [];
  for (let i = 0; i < 49; i++) {
    const pokemon = new MovingPokemon(selectPokemons[i]);
    movingPokemons.push(pokemon);
    getDomBoard().appendChild(pokemon);
  }
};

// Handles pokemon animation by toggling the frame from a random selected position on board.
const movePokemons = () => {
  const pokemonsToMove = generateRandomNumbers(0, 48, 35);
  pokemonsToMove.map(nr => {
    (<MovingPokemon>getDomBoard().childNodes[nr]).toggleFrame();
  });
};
