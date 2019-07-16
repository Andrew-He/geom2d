/**
 * @file Point.js
 * @author andrew he 
 */

export default class Point {
    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    distanceTo(other) {
        return Math.sqrt(Math.pow((other.x - this.x), 2)  + Math.pow(other.y - this.y, 2));
    }

    copy() {
        return this.clone();
    }

    clone() {
        return new Point(this.x, this.y);
    }
}