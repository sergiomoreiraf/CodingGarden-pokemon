import { AppTest } from './app-test/app-test';
import { CustomWebComponent } from './custom-webcomp';

init('app-test', AppTest);

function init(name: string, clazz: typeof CustomWebComponent) {
  const url = `http://127.0.0.1:5500/view/${name}/${name}.html`;
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      customElements.define('app-test', clazz);
    })
    .catch(err => {
      console.debug(err);
    });
}
