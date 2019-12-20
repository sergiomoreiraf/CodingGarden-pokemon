import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

/**
 * The game play button
 */
export class PlayButton extends CustomWebComponent {
  public onClickObservable: Observable<void> = new Observable();
  constructor() {
    super('play-button');
  }

  show() {
    this.hidden = false;
  }

  private onClick() {
    this.onClickObservable.notify();
    this.hidden = true;
  }

  protected postConstruct(): void {
    this.addEventListener('click', this.onClick);
  }

  protected preDestroy(): void {
    this.onClickObservable.unsubscribeAll();
    this.removeEventListener('click', this.onClick);
  }
}
