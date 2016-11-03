import { jq, idGen, rand } from './utils.js';
import questions from './questions.js';
import confetti from './confetti.js';

class Balloon {
    constructor() {
        this.game = null;
        this.id = idGen.create();
        this.question = '';
        this.x = rand(10000) / 100;
        this.delay = rand(8000);
        this.durations = [rand(3500, 5000), rand(5000, 10000)];
        this.color = ['red', 'green', 'blue', 'purple', 'orange'][rand(5)];
        this.element = null;
        this.confetti = null;
        this.popped = false;
    }
    setGameReference(game) {
        this.game = game;
    }
    isCorrect() {
        return this.question === questions.current.questions[0];
    }
    pop() {
        if (this.isCorrect()) {
            confetti.addBurst(this);
            let el = this.getElement();
            jq.addClass(el, 'popped');
            this.popped = true;
            this.game.nextQuestion();
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
        return `<div id="balloon-${this.id}" class="balloon balloon-${this.color}" style="left: ${this.x}%; animation-delay: ${this.delay}ms; animation-duration: ${this.durations[0]}ms, ${this.durations[1]}ms;"><span>${this.question}</span></div>`;
    }
    generateConfettiHTML() {
        return `<div id="confetti-${this.id}"></div>`;
    }
    updateView() {
        let el = this.getElement();
        jq.removeClass(el, 'correct');
        if (this.isCorrect()) {
            jq.addClass(el, 'correct');
        }
        el.querySelector('span').innerText = this.question;
    }
}

export default Balloon;