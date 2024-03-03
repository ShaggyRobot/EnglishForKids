import Card from '../Card/card';

export default function getAnswer(word: Card, context: any): void {
  if (!word) {
    if (context.missCount === 0) {
      context.showEndScreen('win');
    } else {
      context.showEndScreen('loose', context.missCount);
    }
  }

  word.playAudio();

  context.repeatButton.element.onclick = () => {
    word.playAudio();
  };
  const self = context;

  async function answerHandle(e: MouseEvent): Promise<void> {
    if ((e.target as HTMLElement).classList.contains('card__front')) {
      const guess = (e.target as HTMLElement).dataset.word === word.card.word;
      if (guess) {
        context.element.removeEventListener('click', answerHandle);
        (e.target as HTMLElement).parentElement.parentElement.classList.add(
          'inactive',
        );
        await self.correctAnswer();
        getAnswer(context.cardListShuffled.pop(), context);
      } else {
        self.wrongAnswer();
      }
    }
  }
  context.answerCallback = answerHandle;
  context.element.addEventListener('click', answerHandle);
}
