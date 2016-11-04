import game from './game.js';
import elements from './elements.js';

game.placeBalloons();
elements.startBtn.addEventListener('click', () => {
    game.nextQuestion();
    elements.welcome.style.display = 'none';
});

// setTimeout(function() {
// jq.addClass(document.getElementById('title-card'), 'shown');
// }, 2000);