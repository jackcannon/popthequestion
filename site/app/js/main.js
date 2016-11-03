var questions = {
	current: {
		answer: 'A: Test',
		questions: [
			'A: Correct',
			'A: Wrong 1',
			'A: Wrong 2',
			'A: Wrong 3',
			'A: Wrong 4',
			'A: Wrong 5',
			'A: Wrong 6',
			'A: Wrong 7',
			'A: Wrong 8',
			'A: Wrong 9'
		]
	},
	more: [
		{
			answer: 'B: Test',
			questions: [
				'B: Correct',
				'B: Wrong 1',
				'B: Wrong 2',
				'B: Wrong 3',
				'B: Wrong 4',
				'B: Wrong 5',
				'B: Wrong 6',
				'B: Wrong 7',
				'B: Wrong 8',
				'B: Wrong 9'
			]
		}
	]
};

var jq = {
		addClass: function(el, className) {
				el.classList.add(className);
		},
		removeClass: function(el, className) {
				el.classList.remove(className);
		},
		hasClass: function(el, className) {
				el.classList.contains(className);
		}
};
var elements = {
	game: document.getElementById('game'),
	confetti: document.getElementById('confetti-box')
};

const rand = (from = 0, to = 0) => Math.floor(Math.random() * Math.abs(to - from)) + Math.min(from, to);

var idGen = {
	chars: 'abcdefghijklmnopqrstuvwxyz0123456789',
	old: [],
	create: function() {
		let gen = this.gen();
		if (this.old.indexOf(gen) !== -1) {
			return this.new();
		}
		this.old.push(gen);
		return gen;
	},
	gen: function() {
		return new Array(16).fill(1).map(() => {
			return this.chars[rand(this.chars.length)];
		}).join('');
	}
};

class Coor {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	distanceTo(coor) {
		let x = Math.abs(this.x - coor.x);
		let y = Math.abs(this.y - coor.y);
		return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	}
	static random(w, h) {
		let centre = new Coor(w / 2, h / 2);
		let rnd = null;
		while(rnd === null) {
			rnd = new Coor(rand(w), rand(h));
			if (rnd.distanceTo(centre) > (Math.min(w, h) / 2)) {
				rnd = null;
			}
		}
		return rnd;
	}
}

var confetti = {
	generateHTML: (centre) => {
		let dir = rand(1, 4); // direction
		let color = ['red', 'green', 'blue', 'purple', 'orange'][rand(5)];
		let coor = Coor.random(126, 180);
		let d = rand(15) / 100; // animation delay

		let clss = `particle particle-ani-${dir} particle-${color}`;
		let styl = `top: ${centre.y + coor.y}px; left: ${centre.x + coor.x}px; animation-delay: -${d}s;`;
		return `<span class="${clss}" style="${styl}"></span>`;
	}
};

class Balloon {
	constructor() {
		this.id = idGen.create();
		this.question = '';
		this.x = rand(10000) / 100;
		this.delay = rand(8000);
		this.durations = [rand(1500, 4500), rand(5000, 10000)];
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

var game = {
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

game.placeBalloons();

// setTimeout(function() {
//   jq.addClass(document.getElementById('title-card'), 'shown');
// }, 2000);