import './app.scss';
import DOMcomponent from '../DOMcomponent/dom-component';
import Sidebar from '../Sidebar/sidebar';
import Game from '../Game/game';
import { categories } from '../Assets/cards';
import ToggleSwitch from '../Toggle-switch/toggle-switch';
import Footer from '../Footer/footer';

export default class App extends DOMcomponent {
  private sidebar = new Sidebar(this.element);

  private game = new Game(this.element);

  private footer = new Footer(this.element).element;

  private switch = new ToggleSwitch(this.element);

  constructor(parentNode?: HTMLElement) {
    super(parentNode, 'div', ['app']);
    this.setCategories(categories);
    this.setToggleHandler();
  }

  setToggleHandler(): void {
    this.switch.getCheckbox().onchange = () => {
      const { checked } = this.switch.getCheckbox();
      if (this.game.activeCategory) {
        if (checked) {
          this.game.play();
        } else {
          this.game.train();
        }
      } else {
        setTimeout(() => {
          this.switch.getCheckbox().checked = false;
        }, 80);
      }
    };
  }

  setCategories(categoriesArr: string[]): void {
    const homePage = this.sidebar.newCategory('Home Page');
    homePage.element.classList.add('active');
    homePage.element.onclick = () => {
      this.sidebar.switch();
      this.game.homePage();
    };

    categoriesArr.forEach((category) => {
      const cat = this.sidebar.newCategory(category);
      cat.element.addEventListener('click', () => {
        this.game.setCategory(category);
        for (let i = 0; i < this.sidebar.element.children.length; i += 1) {
          this.sidebar.element.children[i].classList.remove('active');
        }
        cat.element.classList.add('active');
      });
    });
  }
}
