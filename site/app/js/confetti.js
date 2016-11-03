import { rand } from './utils.js';
import Coor from './Coor.js';

const confetti = {
    addBurst: (balloon) => {
        let bound = balloon.getElement().getBoundingClientRect();
        let centre = new Coor(bound.left, bound.top);
        balloon.getConfettiElement().innerHTML = new Array(50).fill(1).map(() => {
            return confetti.generateHTML(centre);
        }).join('');
    },
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

export default confetti;