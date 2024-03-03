import DOMcomponent from '../DOMcomponent/dom-component';

export default class RepeatButton extends DOMcomponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['repeat-btn'], 'repeat');
  }

  show(): void {
    this.element.style.visibility = 'visible';
  }

  hide(): void {
    this.element.style.visibility = 'hidden';
  }
}
