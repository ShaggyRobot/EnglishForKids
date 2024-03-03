import DOMcomponent from '../DOMcomponent/dom-component';

export default class Img extends DOMcomponent {
  constructor(src: string, cls: string, parentNode?: HTMLElement | null) {
    super(parentNode, 'img', [`${cls}`]);
    this.element.setAttribute('src', src);
  }
}
