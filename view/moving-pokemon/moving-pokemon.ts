import { CustomWebComponent } from '../custom-webcomp';

/**
 * A moving pokemon that is later attached to the board.
 *
 * Every pokemon must have an id. This is given on the constructor.
 */
export class MovingPokemon extends CustomWebComponent {
  static get observedAttributes() {
    return ['frame'];
  }

  private readonly nr: number;
  private frame = 0;

  constructor(nr: number) {
    super('moving-pokemon');
    this.nr = nr;
  }

  toggleFrame() {
    this.frame = this.frame === 0 ? 1 : 0;
    this.setAttribute('frame', '' + this.frame);
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    this.classList.remove('f' + oldVal);
    this.classList.add('f' + newVal);
  }

  postConstruct(): void {
    this.classList.add('p');
    this.classList.add('n' + this.nr);
    this.classList.add('f' + this.frame);
  }

  preDestroy(): void {}
}