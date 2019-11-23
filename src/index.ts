import { onLoadDocument, generateRandomNumbers } from './lib/util';
import { config } from './config';

import * as timer from './timer';

import { MovingPokemon } from '../view/moving-pokemon/moving-pokemon';

// init sass
import '../sass/style.scss';
// init web components
import '../view';
import { PlayButton } from '../view/play-button/play-button';

// Initial app state
let pokemons: any = {};

// Some DOM elements
const getBoard = () => document.getElementById('board')!;

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
        pokemons[id] = pokemon.name;
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const setInitialHandlers = () => {
  // play button
  const playButton = <PlayButton>(
    document.getElementsByTagName('play-button')[0]
  );
  playButton.onCLickSubscribe(playGame);
};

// When u hit play button
const playGame = () => {
  generateBoard();
  timer.resetTimer();
  timer.startTimer();
  timer.timerObserver.subscribe(movePokemons);
};

const generateBoard = () => {
  // Clear the board
  const board = getBoard();
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  // clean timer observable
  timer.timerObserver.unsubscribeAll();
  // generate random pokemons
  const selectPokemons = generateRandomNumbers(1, config.pokeApi.size, 49);
  pokemons = [];
  for (let i = 0; i < 49; i++) {
    const pokemon = new MovingPokemon(selectPokemons[i]);
    pokemons.push(pokemon);
    board.appendChild(pokemon);
  }
};

const movePokemons = () => {
  const pokemonsToMove = generateRandomNumbers(0, 48, 35);
  const board = getBoard();
  pokemonsToMove.map(nr => {
    (<MovingPokemon>board.childNodes[nr]).toggleFrame();
  });
};
