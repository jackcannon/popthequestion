import { rand } from './utils.js';

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

export default Coor;