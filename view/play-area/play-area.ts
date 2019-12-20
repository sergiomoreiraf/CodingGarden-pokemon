import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib';

export class PlayArea extends CustomWebComponent {
  public onClickObservable: Observable<number> = new Observable();
  constructor(private nr: number, private names: string[]) {
    super('play-area');
  }

  protected postConstruct(): void {
    const src = `https://raw.githubusercontent.com/sergiomoreiraf/CodingGarden-pokemon/master/assets/large/${this.nr}.svg?sanitize=true`;
    this.getElementsByTagName('img')[0].src = src;
    const ul = this.getElementsByTagName('ul')[0];
    this.names.map(name => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });
  }

  protected preDestroy(): void {}
}
