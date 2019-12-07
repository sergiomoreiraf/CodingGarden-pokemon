import { CustomWebComponent } from '../custom-webcomp';

/**
 * Shows a clock based on counter attribute
 */
export class CounterClock extends CustomWebComponent {
  static get observedAttributes() {
    return ['counter'];
  }

  constructor() {
    super('counter-clock');
  }

  set counter(secs: number) {
    if (secs < 0) {
      secs = 0;
    }
    this.setAttribute('counter', '' + secs);
    this.hidden = secs === 0;
  }

  get counter() {
    const number = this.getAttribute('counter');
    return number ? +number : 0;
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    this.firstChild!.textContent = newVal;
  }

  postConstruct(): void {}

  preDestroy(): void {}
}
