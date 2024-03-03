import './sidebar.scss';
import DOMcomponent from '../DOMcomponent/dom-component';
import Img from '../Img/img';
// import { categories } from '../Assets/cards';

export default class Sidebar extends DOMcomponent {
  private arrow = new Img('./Assets/arrow.png', 'sidebar__arrow');

  private overlay = new DOMcomponent(this.element.parentElement, 'div', [
    'sidebar__overlay',
    'invisible',
  ]);

  constructor(parentNode?: HTMLElement) {
    super(parentNode, 'div', ['sidebar', 'hidden']);
    this.element.append(this.arrow.element);
    this.arrow.element.addEventListener('click', () => {
      this.switch();
    });
    this.overlay.element.addEventListener('click', () => {
      this.switch();
    });
  }

  switch(): void {
    this.element.classList.toggle('hidden');
    this.arrow.element.classList.toggle('rotated');
    this.overlay.element.classList.toggle('invisible');
  }

  newCategory(category: string): DOMcomponent {
    const newCat = new DOMcomponent(
      this.element,
      'div',
      ['sidebar__entry'],
      `${category}`,
    );
    newCat.element.onmouseover = () => {
      newCat.element.style.transform = `rotate(${
        Math.random() * 15 - 7.5
      }deg) translateX(20px)`;
    };
    newCat.element.onmouseleave = () => {
      newCat.element.style.transform = '';
    };

    newCat.element.onclick = () => {
      this.switch();
    };

    return newCat;
  }
}
