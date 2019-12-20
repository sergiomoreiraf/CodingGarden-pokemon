import { CustomWebComponent } from '../custom-webcomp';

/**
 * Shows a clock from a counter attribute
 */
export class CounterClock extends CustomWebComponent {
  static get observedAttributes() {
    return ['counter'];
  }

  constructor() {
    super('counter-clock');
    this.counter = 0;
  }

  set counter(secs: number) {
    if (secs < 0) {
      secs = 0;
    }
    this.setAttribute('counter', '' + secs);
    this.hidden = secs === 0;
  }

  get counter() {
    return this.counter;
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    this.firstChild!.textContent = newVal;
  }
}
