/**
 * @file vector.js
 * @author Andrew He
 */

export default class Vector {

    constructor(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new TypeError('Invalid Constructor Argument: Must Be Number');
        }
        this._x = x;
        this._y = y;
    }

    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y;
    }

    get angle() {
        return Math.atan2(this._y, this._x);
    }

    set magnitude(magnitude) {
        let angle = this.angle;
        this._x = Math.cos(angle) * magnitude;
        this._y = Math.sin(angle) * magnitude;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    add(other) {
        return new Vector(this._x + other.x, this._y + other.y);
    }

    subtract(other) {
        return new Vector(this._x - other.x, this._y - other.y);
    }

    multiply(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    negate() {
        this.multiply(-1);
    }

    addTo(other) {
        this._x += other.x;
        this._y += other.y;
    }

    subtractFrom(other) {
        this._x -= other.x;
        this._y -= other.y;
    }

    multiplyBy(scalar) {
        this._x *= scalar;
        this._y *= scalar;
    }

    divideBy(scalar) {
        scalar = scalar === 0 ? 1 : scalar;
        this._x /= scalar;
        this._y /= scalar;
    }

    dot(other) {
        const vec1 = this._normalize(this);
        const vec2 = this._normalize(other);
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    cross(other) {
        return this.x * other.y - this.x * other.y;
    }

    /*
     *  Apply inverse dot product to find the angle between two vectors
     *  @param opt {string} option for converting result in 'rad'(radian) or 'deg'(degree)
     *
     *  @returns {Number} angle in degree or radian
     */
    angleBetween(other, opt = 'rad') {
        const dp = this.dot(this, other);
        const mp = this.magnitude * other.magnitude;
        const rad = Math.acos(dp / mp);
        return (opt === 'rad') ? rad : this._radToDeg(rad);
    }

    _degToRad(theta) {
        return theta * (Math.PI / 180);
    }

    _radToDeg(rad) {
        return (180 * rad) / Math.PI;
    }

    _normalize(vec) {
        return {
            x: vec.x / vec.magnitude,
            y: vec.y / vec.magnitude
        };
    }

}
