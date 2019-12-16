import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

/**
 * The game play button
 */
export class PlayArea extends CustomWebComponent {
  constructor() {
    super('play-area');
  }

  postConstruct(): void {}

  preDestroy(): void {}
}
