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
  }

  protected postConstruct() {
    this.counter = 0;
  }

  initCountdown() {
    this.getElementsByTagName('span')[0].classList.add('countdown');
  }

  set counter(secs: number) {
    if (secs < 0) {
      secs = 0;
      this.getElementsByTagName('span')[0].classList.remove('countdown');
    }
    this.setAttribute('counter', '' + secs);
    this.hidden = secs === 0;
  }

  get counter() {
    return this.counter;
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    this.getElementsByTagName('span')[0].textContent = newVal;
  }
}
