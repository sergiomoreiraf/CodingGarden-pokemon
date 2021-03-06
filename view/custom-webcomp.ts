/**
 * Wrapper that helps to define a web component.
 *
 * The "templateId" on the constructor must match the "id" of the corresponding web component <template> html tag such as: "<templateId>-template"
 *
 * @export
 * @class CustomWebComponent
 * @extends {HTMLElement}
 */
export abstract class CustomWebComponent extends HTMLElement {
  constructor(private templateId: string) {
    super();
  }
  connectedCallback() {
    const idTemplate = this.templateId + '-template';
    const elm = document.getElementById(idTemplate);
    if (!elm) {
      throw new Error(
        `id ${idTemplate} not found on HTML. Make sure you created or fetched a html <template> with this id.`
      );
    }
    const t = (<any>elm!).content;
    const clone = document.importNode(t, true);
    this.appendChild(clone);
    this.postConstruct();
  }
  disconnectedCallback() {
    this.preDestroy();
  }

  /**
   * Called at the end of connectedCallback(). This is right after the element is attached to the DOM.
   *
   * You should implement event listeners here if needed.
   * ex: this.addEventListener('click', this.onClick);
   */
  protected postConstruct() {}

  /**
   * Called at the end of disconnectedCallback(). This is when the element is detached from the DOM.
   *
   * For every event listener created at postConstruct(), you should remove it.
   * ex: this.removeEventListener('click', this.onClick);
   *
   * This avoids memory leak
   */
  protected preDestroy() {}
}
