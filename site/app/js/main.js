import game from './game.js';
import elements from './elements.js';
import { jq } from './utils.js';

game.placeBalloons();
elements.startBtn.addEventListener('click', () => {
    game.nextQuestion();
    elements.welcome.style.display = 'none';
    jq.addClass(elements.titleCard, 'show');
});

// setTimeout(function() {
// jq.addClass(document.getElementById('title-card'), 'shown');
// }, 2000);