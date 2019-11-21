import '../sass/style.scss';
import '../view';

import { onLoadDocument, generateRandomNumbers } from './util';
import * as storage from './storage';

const init = async () => {
  //- Fetch pokemon names
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=100`;
  await fetch(url)
    .then(res => res.json())
    .then(data => {
      let pokemons: any = {};
      data.results.map((pokemon: any) => {
        const _ = pokemon.url.split('/');
        _.pop();
        const id = _.pop();
        pokemons[id] = pokemon.name;
      });
      storage.set(storage.items.pokemons, pokemons);
    })
    .catch(err => {
      console.debug(err);
    });
  //- Create 49 divs inside board, each with a pokemon
  const selectPokemons = generateRandomNumbers(1, 100, 49);
  const board = document.getElementById('board')!;
  for (let i = 0; i < 49; i++) {
    const divOut = document.createElement('div');
    const divIn = document.createElement('div');
    divIn.className = 'p n' + selectPokemons[i];
    divOut.appendChild(divIn);
    board.appendChild(divOut);
  }
  //- Start timer
  //interval = setTimeout(() => {}, 1000);
};
onLoadDocument(init);
