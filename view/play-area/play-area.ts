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
      const span = document.createElement('span');
      span.textContent = name;
      span.addEventListener('click', this.onClick);
      const li = document.createElement('li');
      li.appendChild(span);
      ul.appendChild(li);
    });
  }

  protected preDestroy(): void {
    const ul = this.getElementsByTagName('ul')[0];
    ul.childNodes.forEach(node =>
      node.firstChild!.removeEventListener('click', this.onClick)
    );
  }

  private onClick() {
    const name = this.textContent!;
    let _ = this.parentElement!;
    while (_.tagName !== 'PLAY-AREA') {
      _ = _.parentElement!;
    }
    const playArea = <PlayArea>_;
    playArea.onClickObservable.notify(name);
  }

  highlight(choice: string, answer: string) {
    this.querySelector('#photo')!.classList.add('reveal');
    const isCorrect = choice === answer;
    this.querySelectorAll('li').forEach(li => {
      const span = li.getElementsByTagName('span')[0];
      span.removeEventListener('click', this.onClick);
      if (span.textContent === choice) {
        span.classList.add(isCorrect ? 'correct' : 'wrong');
      } else if (span.textContent === answer) {
        span.classList.add('correct');
      } else {
        span.classList.add('fade');
      }
    });
  }
}
