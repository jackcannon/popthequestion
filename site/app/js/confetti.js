import { rand, idGen } from './utils.js';
import elements from './elements.js';
import Coor from './Coor.js';

const confetti = {
    addBurst: function(balloon) {
        let bound = balloon.getElement().getBoundingClientRect();
        let centre = new Coor(bound.left, bound.top);
        balloon.getConfettiElement().innerHTML = new Array(50).fill(1).map(() => {
            return this.generateHTML(centre);
        }).join('');
    },
    // DO NOT USE. It's really laggy
    finale: function() {
        let maxWidth = window.innerWidth;
        let maxHeight = window.innerHeight / 2;
        new Array(50).fill(1).forEach(() => {
            let id = idGen.create();
            let centre = new Coor(rand(maxWidth), rand(maxHeight));
            elements.confetti.innerHTML += `<div id="confetti-finale-${id}"></div>`;
            let html = new Array(50).fill(1).map(() => {
                return this.generateHTML(centre);
            }).join('');
            setTimeout(() => {
                document.getElementById(`confetti-finale-${id}`).innerHTML = html;
            }, rand(10000));
        });
    },
    generateHTML: function(centre) {
        let dir = rand(1, 4); // direction
        let color = ['red', 'green', 'blue', 'purple', 'orange'][rand(5)];
        let coor = Coor.random(126, 180);
        let d = rand(15) / 100; // animation delay

        let clss = `particle particle-ani-${dir} particle-${color}`;
        let styl = `top: ${centre.y + coor.y}px; left: ${centre.x + coor.x}px; animation-delay: -${d}s;`;
        return `<span class="${clss}" style="${styl}"></span>`;
    }
};

export default confetti;