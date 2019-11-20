export class CustomWebComponent extends HTMLElement {
  constructor(id: string) {
    super();
    const t = (<any>document.getElementById(id)!).content;
    const clone = document.importNode(t, true);
    this.appendChild(clone);
  }
}
