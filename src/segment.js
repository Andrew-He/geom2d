/**
 * @file point.js
 * @author andrew he
 */

import Point from './point';


export default class LineSegment {

    constructor(...points) {
        this._validate(points);
        this.points = points;
    }

    size() {
        return this.points.length;
    }

    get iterator() {
        return this.points[Symbol.iterator]();
    }

    _validate(points) {
        if (!points && points.constructor.name !== 'Array') {
            throw new TypeError('Invalid constructor arguments');
        }
        if (points.length !== 2) {
            throw new TypeError('LineSegment is formed by only 2 point');
        }
        return points.map(point => point instanceof Point).reduce((a, b) => a && b, true);
    }

}


