/**
 * @file ray.js
 * @author andrew he
 */
import Point from './point';
import Vector from './vector';

export default class Ray {

    constructor(origin_, direction_) {
        this._validate(origin_, direction_);
        this.origin = origin_;
        this.direction = direction_;
    }

    _validate(origin, direction) {
        if (!(origin instanceof Point) || !(direction instanceof Vector)) {
            throw new TypeError('Invalid constructor args: point or direction is not in type of Point or Vector');
        }
    }

}