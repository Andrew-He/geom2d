/**
 * @file Circle.js
 * @author andrew he 
 */

import Point from './point';
import {predicates} from './utils';

export default class Circle {

    constructor(x_, y_, r_) {
        this.center = new Point(x_, y_);
        this.r = r_;
    }

    get area() {
        return Math.PI * Math.pow(this.r, 2);
    }

    // 1. 重合 d = 0; r1 = r2
    // 2. 外离 d > r1 + r2
    // 3. 外切 d = r1 + r2
    // 4. 相交 r1 - r2 < d < r1 + r2
    // 5. 内切 d = r1 - r2
    // 6. 内含 d < r1 - r2 
    relationWith(other) {
        if (!(other instanceof Circle)) {
            throw new TypeError('The target compared object is not instance of Circle');
        }
        const d = this.center.distanceTo(other.center);

        const rPlus  = this.r + other.r;
        const rMinus = Math.abs(this.r - other.r);

        return predicates.match(d)
            .on(d => d == 0 && this.r == other.r, () => 1)
            .on(d => d > rPlus, () => 2)
            .on(d => d == rPlus, () => 3)
            .on(d => (d > rMinus) && (d < rPlus), () => 4)
            .on(d => r == rMinus, () => 5)
            .on(d => d < rMinus, () => 6)
            .otherwise(() => console.log("Method ('relationWith'): never reached here, all cases covered"));
    }
}