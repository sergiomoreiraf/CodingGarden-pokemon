import { CustomWebComponent } from '../custom-webcomp';

export class CurrentScore extends CustomWebComponent {
  static get observedAttributes() {
    return ['catch', 'flee'];
  }
  constructor() {
    super('current-score');
  }
  set catch(num: number) {
    this.setAttribute('catch', num > 0 ? '' + num : '');
  }
  set flee(num: number) {
    this.setAttribute('flee', num > 0 ? '' + num : '');
  }
  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    const span = this.querySelector('.' + attrName)!;
    if (newVal === '') {
      span.childNodes[0].textContent = newVal;
      return;
    }
    const innerSpan = document.createElement('span');
    innerSpan.textContent = newVal;
    span.textContent = attrName === 'catch' ? 'Catch:' : 'Flee:';
    span.appendChild(innerSpan);
  }
}
