import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

/**
 * The game play button
 */
export class PlayButton extends CustomWebComponent {
  private observable: Observable<void> = new Observable();
  constructor() {
    super('play-button');
  }

  postConstruct(): void {
    this.observable = new Observable();
    this.addEventListener('click', this.onClick);
  }

  preDestroy(): void {
    this.observable.unsubscribeAll();
    this.removeEventListener('click', this.onClick);
  }

  onCLickSubscribe(fn: () => void) {
    this.observable.subscribe(fn);
  }

  onClick() {
    this.observable.notify();
  }
}
