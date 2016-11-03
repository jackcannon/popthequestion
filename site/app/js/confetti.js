import { rand } from './utils.js';
import Coor from './Coor.js';

export default {
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