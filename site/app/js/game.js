import elements from './elements.js';
import questions from './questions.js';
import Balloon from './Balloon.js';
import { jq } from './utils.js';

const game = {
    balloons: new Array(10).fill(1).map(() => new Balloon()),
    placeBalloons: function(finale = false) {
        if (finale) {
            this.balloons = this.balloons.concat(new Array(10).fill(1).map(() => new Balloon()));
        }

        this.balloons
            .filter(balloon => !balloon.popped)
            .forEach(balloon => this.addBalloon(balloon, finale));
    },
    addNewBalloon: function(finale = false) {
        this.addBalloon(new Balloon(), finale);
    },
    addBalloon: function(balloon = new Balloon(), finale = false) {
        if (this.balloons.indexOf(balloon) === -1) {
            this.balloons.push(balloon);
        }
        balloon.setGameReference(game);
        balloon.setFinale(finale);

        elements.game.insertAdjacentHTML('beforeend', balloon.generateHTML());
        elements.confetti.insertAdjacentHTML('beforeend', balloon.generateConfettiHTML());

        balloon.getElement().addEventListener('click', () => balloon.pop());
    },
    tidyUp: function() {
        this.balloons
            .filter(balloon => balloon.popped)
            .forEach(balloon => balloon.remove(false));
        this.balloons = this.balloons
            .filter(balloon => !balloon.popped);
    },
    nextQuestion: function() {
        if (questions.nextQuestion()) {
            this.balloons.filter(balloon => !balloon.popped).reverse().forEach((balloon, index) => {
                balloon.question = questions.current.questions[index];
                balloon.updateView();
            });
            elements.caption.style.opacity = '1';
            jq.changeText(elements.answer, questions.current.answer);
            if (questions.more.length === 0) {
                jq.changeText(elements.titleCard, '<h1 class="title"><span><span class="capital">P</span>op</span> <span>the</span> <span><span class="capital">Q</span>uestion!</span></h1>');
            }
        } else {
            elements.caption.style.opacity = '0';
            elements.answer.style.opacity = '0';
            this.placeBalloons(true);
            elements.celeImgs.forEach(el => jq.addClass(el, 'show'));
        }
    }
};

window.cheat = function() {
    [...document.getElementsByClassName('correct')].forEach(el => el.click());
};

export default game;