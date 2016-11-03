import elements from './elements.js';
import questions from './questions.js';
import Balloon from './Balloon.js';

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
            // update answer
        }
    }
};

export default game;