import { jq, idGen, rand } from './utils.js';
import questions from './questions.js';
import confetti from './confetti.js';

class Balloon {
    constructor(finale = false) {
        this.game = null;
        this.finale = finale;
        this.id = idGen.create();
        this.question = '';
        this.x = rand(10000) / 100;
        this.delay = rand(8000);
        this.durations = [rand(3500, 5000), rand(4000, 12000)];
        this.color = ['red', 'green', 'blue', 'purple', 'orange'][rand(5)];
        this.element = null;
        this.confetti = null;
        this.popped = false;
        this.finalePopTimeoutId = null;
    }
    setGameReference(game) {
        this.game = game;
    }
    setFinale(finale) {
        this.finale = finale;
        if (finale && !this.finalePopTimeoutId) {
            this.finalePopTimeoutId = setTimeout(() => {
                if (!this.popped) {
                    this.pop();
                }
            }, rand(3000, 12000));
        }
    }
    isCorrect() {
        return questions.current && this.question === questions.current.questions[0];
    }
    pop() {
        if (this.isCorrect()) {
            confetti.addBurst(this);
            let el = this.getElement();
            jq.addClass(el, 'popped');
            this.popped = true;
            this.remove();
            this.game.nextQuestion();
        } else if (this.finale) {
            confetti.addBurst(this);
            let el = this.getElement();
            jq.addClass(el, 'popped');
            this.popped = true;
            this.remove();
            this.game.addNewBalloon(true);
        }
    }
    getElement() {
        if (this.element !== null) {
            return this.element;
        }
        this.element = document.getElementById('balloon-' + this.id);
        return this.element;
    }
    getConfettiElement() {
        if (this.confetti !== null) {
            return this.confetti;
        }
        this.confetti = document.getElementById('confetti-' + this.id);
        return this.confetti;
    }
    generateHTML() {
        return `<div id="balloon-${this.id}" class="balloon balloon-${this.color} ${(this.finale) ? 'finale' : ''}" style="left: ${this.x}%; animation-delay: ${this.delay}ms; animation-duration: ${this.durations[0]}ms, ${this.durations[1]}ms;"><span>${(this.finale) ? '' : this.question}</span></div>`;
    }
    generateConfettiHTML() {
        return `<div id="confetti-${this.id}"></div>`;
    }
    remove(removeFromGame = true) {
        this.getElement().remove();
        setTimeout(() => this.getConfettiElement().remove(), 5000);
        if (removeFromGame) {
            var index = this.game.balloons.indexOf(this);
            if (index !== -1) {
                this.game.balloons.splice(index, 1);
            }
        }
    }
    updateView() {
        let el = this.getElement();
        jq.removeClass(el, 'correct');
        jq.removeClass(el, 'finale');
        if (this.isCorrect()) {
            jq.addClass(el, 'correct');
        }
        if (this.finale) {
            jq.addClass(el, 'finale');
        }
        let span = el.querySelector('span');
        if (span.innerHTML !== this.question) {
            jq.changeText(span, this.question);
        }
    }
}

export default Balloon;