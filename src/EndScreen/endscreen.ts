import './endscreen.scss';
import DOMcomponent from '../DOMcomponent/dom-component';
import Img from '../Img/img';

export default class EndScreen extends DOMcomponent {
  public okBtn = new DOMcomponent(this.element, 'div', ['ok-button'], 'OK')
    .element;

  constructor(parentNode: HTMLElement, result: string, missCount?: number) {
    super(parentNode, 'div', ['endscreen']);
    switch (result) {
      case 'win':
        this.element.append(
          new Img('./Assets/you-win-banner.jpg', 'result-banner').element,
        );
        break;

      case 'loose':
        this.element.append(
          new Img('./Assets/you-lose-banner.png', 'result-banner').element,

          new DOMcomponent(
            this.element,
            'div',
            ['endscreen__miss-count'],
            `Mistakes made: ${missCount}`,
          ).element,
        );
        break;

      default:
        break;
    }
  }
}
