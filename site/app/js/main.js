import game from './game.js';
import elements from './elements.js';
import { jq } from './utils.js';

game.addNewBalloons(10);
elements.startBtn.addEventListener('click', () => {
    game.nextQuestion();
    elements.welcome.style.display = 'none';
    jq.addClass(elements.titleCard.orig, 'show');
});