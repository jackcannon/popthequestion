import elements from './elements.js';
import questions from './questions.js';
import Balloon from './Balloon.js';
import { jq } from './utils.js';

const game = {
    balloons: new Array(10).fill(1).map(() => new Balloon()),
    placeBalloons: function() {
        let html = '';
        let conf = '';
        this.balloons.forEach((balloon) => {
            html += balloon.generateHTML();
            conf += balloon.generateConfettiHTML();
        });
        elements.game.innerHTML = html;
        elements.confetti.innerHTML = conf;

        this.balloons.forEach(balloon => {
            balloon.setGameReference(game);
            balloon.getElement().addEventListener('click', () => balloon.pop());
        });
    },
    nextQuestion: function() {
        if (questions.nextQuestion()) {
            this.balloons.filter(balloon => !balloon.popped).reverse().forEach((balloon, index) => {
                balloon.question = questions.current.questions[index];
                balloon.updateView();
            });
            elements.caption.style.opacity = '1';
            jq.changeText(elements.answer, questions.current.answer);
        } else {
            elements.caption.style.opacity = '0';
            elements.answer.style.opacity = '0';
            jq.changeText(elements.titleCard, '<h1 class="title"><span><span class="capital">P</span>op</span> <span>the</span> <span><span class="capital">Q</span>uestion!</span></h1>');

        }
    }
};

export default game;