import { CustomWebComponent } from '../custom-webcomp';
import { cleanChildElements } from '../../src/lib';

export class CurrentScore extends CustomWebComponent {
  static get observedAttributes() {
    return ['catch', 'flee'];
  }
  constructor() {
    super('current-score');
  }
  set catch(num: number) {
    this.setAttribute('catch', '' + num);
  }
  set flee(num: number) {
    this.setAttribute('flee', '' + num);
  }
  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    const span = <HTMLSpanElement>this.querySelector('.' + attrName)!;
    if (newVal === '0') {
      span.hidden = true;
      cleanChildElements(span);
      return;
    }
    span.hidden = false;
    const innerSpan = document.createElement('span');
    innerSpan.textContent = newVal;
    span.textContent = attrName === 'catch' ? 'CATCH:' : 'FLEE:';
    span.appendChild(innerSpan);
  }
}
