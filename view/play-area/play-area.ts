import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib';

export class PlayArea extends CustomWebComponent {
  public onClickObservable: Observable<string> = new Observable();
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
      li.addEventListener('click', () => this.onClick(name));
      ul.appendChild(li);
    });
  }

  protected preDestroy(): void {
    const ul = this.getElementsByTagName('ul')[0];
    ul.childNodes.forEach(node =>
      node.removeEventListener('click', () => this.onClick(name))
    );
  }

  private onClick(name: string) {
    this.onClickObservable.notify(name);
  }

  reveal() {
    this.querySelector('#photo')!.classList.add('reveal');
  }

  highlight(choice: string, answer: string) {
    const isCorrect = choice === answer;
    this.querySelectorAll('li').forEach(node => {
      if (node.textContent === choice) {
        node.classList.add(isCorrect ? 'correct' : 'wrong');
      }
    });
  }
}
