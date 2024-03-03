import DOMcomponent from '../DOMcomponent/dom-component';
import './footer.scss';

export default class Footer extends DOMcomponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['app__footer']);

    this.element.innerHTML = `
      <a class="app__logo-link" href="https://github.com/ShaggyRobot">
          <img class="app__logo-img"  src="./Assets/github-logo.svg" alt="github">
      </a>
      <a class="app__logo-link" href="https://rs.school/js/">
          <img class="app__logo-img"  src="./Assets/rss-logo.svg" alt="RS School">
          <span class="date">2021</span>
      </a>
    `;
  }
}
