/**
 * @file polygon.js
 * @author andrew he
 */

import Polygon from './polygon';

class Rectangle extends Polygon {

    constructor(...points) {
        super(...points);
        this._validate(points);
    }

    // @override 
    _validate(points) {
        if (this.size !== 4) {
            throw new Error('Invalid Rectangle: only accepts Four points');
        }
    }

}



