import './card.scss';
import { CardInfo } from '../Interfaces/interfaces';
import DOMcomponent from '../DOMcomponent/dom-component';

export default class Card extends DOMcomponent {
  private audio = new Audio();

  public card: CardInfo;

  constructor(card: CardInfo, parentNode?: HTMLElement) {
    super(parentNode, 'div', ['card-container']);
    this.card = card;
    this.trainMode();
  }

  playAudio(): void {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  flip(): void {
    this.select('card').classList.add('flipped');
    this.element.addEventListener(
      'mouseleave',
      () => {
        this.unflip();
      },
      {
        once: true,
      },
    );
  }

  unflip(): void {
    this.select('card').classList.remove('flipped');
  }

  trainMode(): void {
    this.element.classList.remove('inactive');
    this.element.innerHTML = `
    <div class="card">
      <div class="card__front" style = "background-image: url(./Assets/${this.card.image})">
        <div class="card-text">${this.card.word}</div>
      </div>
      <div class="card__back" style = "background-image: url(./Assets/${this.card.image})">
        <div class="card-text">${this.card.translation}</div>
      </div>
      <div class="card__flip" style = "background-image: url('./Assets/circular-arrow.png')"></div>
    </div>`;

    this.audio.src = `./Assets/${this.card.audioSrc}`;

    this.select('card__flip').addEventListener('click', () => {
      this.flip();
    });

    this.select('card__front').addEventListener('click', () => {
      this.playAudio();
    });
  }

  playMode(): void {
    this.element.innerHTML = `
    <div class="card">
      <div class="card__front" data-word="${this.card.word}" style = "background-image: url(./Assets/${this.card.image})"></div>
    </div>`;
  }

  private select(cls: string): HTMLElement {
    return this.element.querySelector(`.${cls}`);
  }
}
