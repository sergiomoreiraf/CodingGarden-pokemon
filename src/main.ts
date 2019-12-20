import * as lib from './lib';
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
  selectedPokemon?: view.MovingPokemon;
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
  url: `https://pokeapi.co/api/v2/pokemon/?limit=100`,
  // numbers of pokemons to play with. Must match 'limit' on url query
  size: 100
};

const DOM = {
  getBoardSection: () => document.getElementById('board')!,
  getPlaySection: () => document.getElementById('play')!,
  getPlayButton: () =>
    <view.PlayButton>document.getElementsByTagName('play-button')[0],
  getCounterClock: () =>
    <view.CounterClock>document.getElementsByTagName('counter-clock')[0],
  getPlayArea: () =>
    <view.PlayArea>document.getElementsByTagName('play-area')[0]
};

/**
 * General error handling
 */
const error = (err: any) => {
  console.error(err);
  state.error.hasError = true;
};

// What happens when the app loads
const init = async () => {
  await fetchPokemons();
  DOM.getPlayButton().onClickObservable.subscribe(playGame);
  timer.timerObservable.subscribe(secs => {
    DOM.getCounterClock().counter = secs!;
    if (secs === 0) {
      DOM.getPlayButton().show();
    }
  });
  timer.timerObservable.subscribe(movePokemons);
};
lib.onLoadDocument(init);

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

const playGame = () => {
  generateBoard();
  timer.resetTimer();
  timer.startTimer();
};

const generateBoard = () => {
  lib.cleanChildElements(DOM.getBoardSection());
  // generate random pokemons and add to board
  const selectPokemons = lib.generateRandomNumbers(1, config.size, 49);
  state.movingPokemons = [];
  for (let i = 0; i < 49; i++) {
    const pokemon = new view.MovingPokemon(selectPokemons[i]);
    pokemon.onClickObservable.subscribe(pokemon =>
      selectPokemonOnBoard(pokemon!)
    );
    state.movingPokemons.push(pokemon);
    DOM.getBoardSection().appendChild(pokemon);
  }
};

// Handles pokemon animation by toggling the frame.
const movePokemons = () => {
  const pokemonsToMove = lib.generateRandomNumbers(0, 48, 35);
  pokemonsToMove.map(nr => {
    (<view.MovingPokemon>DOM.getBoardSection().childNodes[nr]).toggleFrame();
  });
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
  const namedPokemons = pokemonsToChose.map(nr => state.pokemonNames[nr]);
  lib.cleanChildElements(DOM.getPlaySection());
  const playArea = new view.PlayArea(pokemon.number, namedPokemons);
  playArea.onClickObservable.subscribe(str => handleGuess(str!));
  DOM.getPlaySection().appendChild(playArea);
};

const handleGuess = (guess: string) => {
  const answer = state.pokemonNames[state.selectedPokemon?.number!];
  const isCorrect = answer === guess;
  DOM.getPlayArea().reveal();
  DOM.getPlayArea().highlight(guess, answer);
  if (isCorrect) {
    console.log('correct');
  }
};
