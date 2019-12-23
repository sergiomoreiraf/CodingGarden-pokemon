import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

/**
 * A moving pokemon based on frame toggle.
 *
 * Every pokemon must have his numeric id.
 */
export class MovingPokemon extends CustomWebComponent {
  public onClickObservable: Observable<MovingPokemon> = new Observable();
  static get observedAttributes() {
    return ['frame'];
  }

  constructor(private nr: number, private frame: 0 | 1 = 0) {
    super('moving-pokemon');
  }

  toggleFrame() {
    this.frame = this.frame === 0 ? 1 : 0;
    this.setAttribute('frame', '' + this.frame);
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if (attrName === 'frame')
      newVal === '1' ? this.classList.add('f2') : this.classList.remove('f2');
  }

  get number() {
    return this.nr;
  }

  hidePokemon(isCaptured: boolean) {
    this.removeEventListener('click', this.onClick);
    this.classList.remove('link');
    this.classList.add(isCaptured ? 'catch' : 'gone');
  }

  private onClick() {
    this.onClickObservable.notify(this);
  }

  protected postConstruct(): void {
    this.classList.add('n' + this.nr);
    this.classList.add('link');
    this.addEventListener('click', this.onClick);
  }

  protected preDestroy(): void {
    this.onClickObservable.unsubscribeAll();
    this.removeEventListener('click', this.onClick);
  }
}
