import './toggle-switch.scss';
import DOMcomponent from '../DOMcomponent/dom-component';

export default class ToggleSwitch extends DOMcomponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['toggle-switch']);
    this.element.innerHTML = `
    <input type="checkbox" id="toggle" class="checkbox" />
    <label for="toggle" class="switch"></label>`;
  }

  getCheckbox(): HTMLInputElement {
    return <HTMLInputElement> this.element.querySelector('#toggle');
  }
}
