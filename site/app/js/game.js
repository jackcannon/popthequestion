import elements from './elements.js';
import questions from './questions.js';
import Balloon from './Balloon.js';

const game = {
    balloons: new Array(10).fill(1).map(() => new Balloon()),
    placeBalloons: function() {
        let html = '';
        let conf = '';
        this.balloons.forEach((ball, index) => {
            ball.question = questions.current.questions[index];
            html += ball.generateHTML();
            conf += ball.generateConfettiHTML();
        });
        elements.game.innerHTML = html;
        elements.confetti.innerHTML = conf;

        game.balloons.forEach(balloon => {
            balloon.getElement().addEventListener('click', () => balloon.pop());
        });
    }
};

export default game;