/**
 * @file polygon.js
 * @author andrew he
 */

import Polygon from './polygon';
import Point from './Point';
import 

class Rectangle extends Polygon {

    constructor(...points) {
        super(...points);
        this._validate(points);
    }

    intersects(rect) {
        return !(rect.left - rect.width > this.left + this.width
            || rect.left + rect.width < this.left - this.width
            || rect.top - rect.height > this.top + this.height
            || rect.top + rect.height < this.top - this.height);
    }

    contains(target) {
        if (!(target instanceof Point)) {
            throw new TypeError('target is not type of point');
        }
        return (point.x >= this.left - this.width
            && point.x <= this.left + this.width
            && point.y >= this.top - this.height
            && point.y <= this.top + this.height);
    }

    // @override 
    _validate(points) {
        if (this.size !== 4) {
            throw new Error('Invalid Rectangle: only accepts Four points');
        }
    }

}



