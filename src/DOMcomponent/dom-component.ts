export default class DOMcomponent {
  element: HTMLElement;

  constructor(
    public parentNode: HTMLElement | null,
    public tag: keyof HTMLElementTagNameMap = 'div',
    public classes: string[] = [],
    public content: string = '',
  ) {
    this.element = document.createElement(tag);
    this.element.innerHTML = content;
    this.element.classList.add(...classes);

    if (parentNode) {
      parentNode.append(this.element);
    }
  }
}
