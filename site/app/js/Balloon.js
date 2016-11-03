import jq from './jq.js';
import Coor from './Coor.js';
import { idGen, rand } from './utils.js';
import questions from './questions.js';
import confetti from './confetti.js';

class Balloon {
	constructor() {
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
	pop() {
		if (this.question === questions.current.questions[0]) {
			let el = this.getElement();
			let bound = el.getBoundingClientRect();
			let centre = new Coor(bound.left, bound.top);
			let html = '';
			new Array(50).fill(1).forEach(() => {
				html += confetti.generateHTML(centre);
			});
			this.getConfettiElement().innerHTML = html;
			jq.addClass(el, 'popped');
			this.popped = true;
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
		this.getElement().querySelector('span')[0].innerText = this.question;
	}
}

export default Balloon;