import DOMcomponent from '../DOMcomponent/dom-component';
import Img from '../Img/img';

export default class StarStrip extends DOMcomponent {
  constructor(parentElement?: HTMLElement) {
    super(parentElement, 'div', ['game__star-strip']);
  }

  correct(): void {
    this.element.append(
      new Img('./Assets/star-filled.svg', 'game__star-strip-star').element,
    );
  }

  wrong(): void {
    this.element.append(
      new Img('./Assets/star-empty.svg', 'game__star-strip-star').element,
    );
  }

  clear(): void {
    this.element.textContent = '';
  }
}
