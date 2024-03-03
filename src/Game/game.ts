import './game.scss';
import Card from '../Card/card';
import DOMcomponent from '../DOMcomponent/dom-component';
import { cards, categories } from '../Assets/cards';
import EndScreen from '../EndScreen/endscreen';
import StarStrip from './star-strip';
import RepeatButton from './repeat-button';
import getAnswer from './get-answer';

export default class Game extends DOMcomponent {
  private missCount = 0;

  private currentIndex = 0;

  private audio = new Audio();

  private repeatButton = new RepeatButton(this.element.parentElement);

  public activeCategory = '';

  private cardList: Card[] = [];

  private cardListShuffled = this.cardList.slice(0).sort(() => Math.random() - 0.5);

  private categoriesList: string[] = [];

  private starStrip = new StarStrip();

  private answerCallback: (e: MouseEvent) => Promise<void>;

  constructor(parentNode?: HTMLElement) {
    super(parentNode, 'div', ['game']);
    this.homePage();
  }

  setCategory(category: string): void {
    this.element.removeEventListener('click', this.answerCallback);
    this.repeatButton.hide();
    (document.getElementById('toggle') as HTMLInputElement).checked = false;
    this.activeCategory = category;
    this.element.textContent = '';
    this.starStrip.clear();
    this.repeatButton.hide();
    this.cardList = [];
    cards[categories.indexOf(category)].forEach((card) => {
      const freshCard = new Card(card);
      this.cardList.push(freshCard);
      this.element.append(freshCard.element);
    });
  }

  homePage(): void {
    this.repeatButton.hide();
    this.activeCategory = '';
    if (document.getElementById('toggle')) {
      (document.getElementById('toggle') as HTMLInputElement).checked = false;
    }
    this.element.textContent = '';
    this.starStrip.clear();
    this.repeatButton.hide();
    this.categoriesList = [];
    categories.forEach((category) => {
      this.categoriesList.push(category);
      const catTile = new DOMcomponent(
        this.element,
        'div',
        ['game__cat-tile'],
        `${category}`,
      );

      catTile.element.style.backgroundImage = `url(./Assets/${
        cards[categories.indexOf(category)][0].image
      })`;

      this.element.append(catTile.element);
      catTile.element.onclick = () => {
        this.setCategory(category);
      };

      catTile.element.onmouseover = () => {
        catTile.element.style.transform = `rotate(${
          Math.random() * 15 - 7.5
        }deg) scale(1.15)`;
      };

      catTile.element.onmouseleave = () => {
        catTile.element.style.transform = `rotate(${
          Math.random() * 15 - 7.5
        }deg) scale(1)`;
      };
    });
  }

  train(): void {
    // (document.getElementById('toggle') as HTMLInputElement).checked = false;
    this.element.removeEventListener('click', this.answerCallback);
    this.repeatButton.hide();
    this.starStrip.clear();
    this.cardList.forEach((card) => {
      card.trainMode();
    });
  }

  wrongAnswer(): void {
    this.audio.src = './Assets/Wrong-answer-sound-effect.mp3';
    this.audio.currentTime = 0;
    this.starStrip.wrong();
    this.audio.play();
    this.missCount += 1;
  }

  async correctAnswer(): Promise<void> {
    this.audio.src = './Assets/Correct-answer-sound.mp3';
    this.audio.currentTime = 0;
    this.starStrip.correct();
    return new Promise((resolve) => {
      this.audio.play();
      this.audio.onended = () => resolve();
    });
  }

  // getAnswer(word: Card): void {
  //   if (!word) {
  //     if (this.missCount === 0) {
  //       this.showEndScreen('win');
  //     } else {
  //       this.showEndScreen('loose', this.missCount);
  //     }
  //   }

  //   word.playAudio();

  //   this.repeatButton.element.onclick = () => { word.playAudio(); };
  //   const self = this;

  //   async function answerHandle(e: MouseEvent) {
  //     if ((e.target as HTMLElement).classList.contains('card__front')) {
  //       const guess = (e.target as HTMLElement).dataset.word === word.card.word;
  //       if (guess) {
  //         self.element.removeEventListener('click', answerHandle);
  //         (e.target as HTMLElement).parentElement.parentElement.classList.add('inactive');
  //         await self.correctAnswer();
  //         self.getAnswer(self.cardListShuffled.pop());
  //       } else {
  //         self.wrongAnswer();
  //       }
  //     }
  //   }
  //   this.answerCallback = answerHandle;
  //   this.element.addEventListener('click', answerHandle);
  // }

  play(): void {
    this.element.parentElement.append(this.starStrip.element);
    this.cardList.forEach((card) => {
      card.playMode();
    });
    this.repeatButton.show();
    this.cardListShuffled = this.cardList.slice(0).sort(() => Math.random() - 0.5);
    getAnswer(this.cardListShuffled.pop(), this);
  }

  showEndScreen(result: string, missCount?: number): void {
    this.element.textContent = '';
    const endScr = new EndScreen(this.element, result, missCount);
    const { okBtn } = endScr;
    okBtn.onclick = () => {
      this.homePage();
      (document.getElementById('toggle') as HTMLInputElement).checked = false;
    };
  }
}
