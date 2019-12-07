import { CustomWebComponent } from './custom-webcomp';
import { MovingPokemon, PlayButton, CounterClock } from './';

import { error } from '../src/main';

// For every web component we create, we must initialize it. This is handled by the init().
init('moving-pokemon', MovingPokemon);
init('play-button', PlayButton);
init('counter-clock', CounterClock);

/**
 * Type that describes a class that extends another class.
 */
type instanceOfSomething<T> = new (...args: any[]) => T;

/**
 * Initializes a web component.
 *
 * For this project, each web component has it's own .html and .ts. They must have the same name and be on a folder with that name.
 *
 * The html file must have a <template> on it. This is remotely fetched and attached to the body of the main html, then the web component is initialized.
 *
 * By convention, every web component must have a hyphen '-' on it's name.
 *
 * @param webComponentTagName the html tag name of the custom web component.
 * @param clazz a class that must extends CustomWebComponent.
 */
function init(
  webComponentTagName: string,
  clazz: instanceOfSomething<CustomWebComponent>
) {
  const url = `http://127.0.0.1:5500/view/${webComponentTagName}/${webComponentTagName}.html`;
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      customElements.define(webComponentTagName, <any>clazz);
    })
    .catch(err => {
      console.error(err);
      error();
    });
}
