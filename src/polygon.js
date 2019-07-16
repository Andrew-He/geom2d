/**
 * @file Polygon.js
 * @author andrew he 
 */

import Point from './point';
import Vector from './vector';
import {geomUtil} from './utils';

export default class Polygon {
    constructor(...points) {
        this._validate(points);
        this.points = points;
        this.boundingRect = geomUtil.getBoundingRect(points);
    }

    get size() {
        this.points.length;
    }

    get area() {
        let sum = 0;
        let p0 = this.points[0];
        let size = this.points.length;
        for (let i = 0; i < size; i++) {
            let vec1 = new Vector(this.points[i].subtract(p0));
            let vec2 = new Vector(this.points[(i + 1) % size].subtract(p0));
            sum += vec1.cross(vec2);
        }
        return Math.abs(sum) / 2;
    }

    get left() {
        return this.boundingRect.left;
    }

    get right() {
        return this.boundingRect.right;
    }

    get top() {
        return this.boundingRect.top;
    }

    get bottom() {
        return this.boundingRect.bottom;
    }

    get width() {
        return this.boundingRect.width;
    }

    get height() {
        return this.boundingRect.height;
    }

    get iterator() {
        return this.points[Symbol.iterator]();
    }

    _validate(points) {
        if (!points && points.constructor.name !== 'Array') {
            throw new TypeError('Invalid constructor arguments');
        }
        if (points.length < 3) {
            throw new TypeError('Polygon is formed by at least 3 point');
        }
        return points.map(point => point instanceof Point).reduce((a, b) => a && b, true);
    }

}
