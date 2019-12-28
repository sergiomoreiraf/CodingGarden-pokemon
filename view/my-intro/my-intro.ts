import { CustomWebComponent } from '../custom-webcomp';
import { Observable } from './../../src/lib/observable';

export class MyIntro extends CustomWebComponent {
  public onClickObservable: Observable<void> = new Observable();

  constructor() {
    super('my-intro');
  }

  private onClick() {
    let _ = this.parentElement!;
    while (_.tagName !== 'MY-INTRO') {
      _ = _.parentElement!;
    }
    const myIntro = <MyIntro>_;
    myIntro.onClickObservable.notify();
  }

  protected postConstruct(): void {
    this.querySelector('#a-high-score')!.addEventListener(
      'click',
      this.onClick
    );
  }

  protected preDestroy(): void {
    this.onClickObservable.unsubscribeAll();
    this.querySelector('#a-high-score')!.removeEventListener(
      'click',
      this.onClick
    );
  }
}
