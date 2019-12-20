import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

/**
 * A moving pokemon based on frame toggle.
 *
 * Every pokemon must have his numeric id.
 */
export class MovingPokemon extends CustomWebComponent {
  public onClickObservable: Observable<number> = new Observable();
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

  private onClick() {
    this.onClickObservable.notify(this.nr);
  }

  protected postConstruct(): void {
    this.classList.add('n' + this.nr);
    this.addEventListener('click', this.onClick);
  }

  protected preDestroy(): void {
    this.onClickObservable.unsubscribeAll();
    this.removeEventListener('click', this.onClick);
  }
}
