import { CustomWebComponent } from '../custom-webcomp';

/**
 * A moving pokemon that is later attached to the board.
 *
 * Every pokemon must have an id. This is given on the constructor.
 */
export class MovingPokemon extends CustomWebComponent {
  public readonly nr: number;

  constructor(nr: number) {
    super('moving-pokemon');
    this.nr = nr;
  }

  postConstruct(): void {
    this.classList.add('p');
    this.classList.add('n' + this.nr);
  }

  preDestroy(): void {}
}
