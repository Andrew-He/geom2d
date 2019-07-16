/**
 * @file Bitset.js
 * @author andrew he
 * @reference http://www.cplusplus.com/reference/bitset/
 */

export default class Bitset {

    constructor(value) {
        if (typeof value === 'number') {
            this.value = new Number(value).valueOf();
            if (this.value === Infinity) {
                throw new RangeError('Invalid Constructor Argument: Initialized Argument Cannot Be Infinity');
            }
        } else if (typeof value === 'string') {
            this.value = parseInt(value, 2);
            if (isNaN(this.value)) {
                throw new RangeError('Invalid Constructor Argument: Initialized Argument Cannot Be NaN');
            }
        } else {
            throw new TypeError('Invalid Constructor Argument: Accept String (ex. 11001010) or Unsigned Integer only');
        }
    }

    /*
     *  Returns whether all of the bits in the bitset are set (to one).
     *
     *  @returns {boolean} true if all of the bits in the bitset are set (to one), and false otherwise.
     */
    all() {
        return this.value === this._allone(this.value);
    }

    /*
     *  Returns whether any of the bits is set (i.e., whether at least one bit in the bitset is set to one).
     *
     *  @returns {boolean} true if any of the bits in the bitset is set (to one), and false otherwise.
     */
    any() {
        return this.value > 0;
    }

    /*
     *  Returns whether none of the bits is set (i.e., whether all bits in the bitset have a value of zero).
     *  opposite of Bitset::any
     *
     *  @returns {boolean} true if none of the bits in the bitset is set (to one), and false otherwise.
     */
    none() {
        return this.value === 0;
    }

    /*
     *  Returns the number of bits in the bitset that are set (i.e., that have a value of one).
     *
     *  @returns {integer} The number of bits set.
     */
    count() {
        return this.cardinality();
    }

    /*
     *  Flips bit values converting zeros into ones and ones into zeros
     *  @param pos {integer} Order position of the bit whose value is flipped. if pos is null or negative, flip all
     *
     *  @returns {object} *this
     */
    flip(pos) {
        this._checkIfOutOfRange(pos);
        this.value = (pos > 0) ? (this.value ^ (0b1 << pos)) : (this.value ^ this._allone(this.value));
        return this;
    }

    /*
     *  modify order position of bit
     *  @param pos {unsigned integer} Order position of the bit whose value is modified
     *  @param value {integer} zero or one binary
     *
     *  @returns {boolean} *this
     */
    set(pos, value = true) {
        this._checkIfOutOfRange(pos);
        if (pos < 0) {
            return this;
        }
        this.value = value ? this.value | 1 << pos : this.value & ~(1 << pos);
        return this;
    }

    /*
     *  Resets bits to zero
     *  @param pos {unsigned integer} order position of the bit
     *
     *  @returns {boolean} *this
     */
    reset(pos = -1) {
        if (pos > 0) {
            this.value = this.value & ~(1 << pos);
        }
        this.value = 0;
        return this;
    }

    /*
     *  Returns whether the bit at position pos is set (i.e., whether it is one).
     *  @param pos {unsigned integer} Order position of the bit
     *
     *  @returns {boolean} true if the bit at position pos is set, and false if it is not set.
     */
    test(pos) {
        this._checkIfOutOfRange(pos);
        return !!(this.value &  0b1 << pos);

    }

    /*
     *  Returns the number of bits in the bitset.
     *
     *  @returns {unsigned integer} The number of bits in the bitset
     */
    size() {
        return Math.log2(Number.MAX_SAFE_INTEGER);
    }

    cardinality() {
        return this.toString().match(/(1)/g).length;
    }

    equal(other) {
        const otherCopy = this._convertIfNot(other);
        return this.value === otherCopy.valueOf();
    }

    notEqual(other) {
        const otherCopy = this._convertIfNot(other);
        return this.value !== otherCopy.valueOf();
    }

    and(other) {
        const otherCopy = this._convertIfNot(other);
        this.value &= otherCopy.valueOf();
        return this;
    }

    or(other) {
        const otherCopy = this._convertIfNot(other);
        this.value |= otherCopy.valueOf();
        return this;
    }

    not() {
        const allone = this._allone(this.value);
        this.value ^= allone;
        return this;
    }

    xor(other) {
        this.value = this.copy().or(other).and(this.copy().and(other).not()).valueOf();
        return this;
    }

    nor(other) {
        this.or(other).not();
        return this;
    }

    nand(other) {
        this.and(other).not();
        return this;
    }

    shiftLeft(nBits) {
        this.value <<= nBits;
        return this;
    }

    shiftRight(nBits) {
        this.value >>= nBits;
        return this;
    }

    // @override
    toString() {
        return this.value.toString(2);
    }

    // @override
    valueOf() {
        return this.value;
    }

    toArray() {
        return [...this.toString()];
    }

    clone() {
        return new Bitset(this.value);
    }

    copy() {
        return this.clone();
    }

    // return number of bits in current value
    length() {
        return (Math.floor(Math.log2(this.value)) + 1) || 0;
    }

    _checkIfOutOfRange(pos) {
        const nBits = this.length();
        if (pos >= nBits) {
            throw new RangeError(`flip out of range, pos must between 0 to ${nBits}`);
        }
        return;
    }

    _allone(n) {
        let ones = 1;
        let iter = 0;
        while (++iter < this.length(n)) {
            ones <<= 1;
            ones |= 1;
        }
        return ones;
    }

    _convertIfNot(other) {
        if (!(other instanceof Bitset)) {
            return new Bitset(other);
        }
        return other;
    }

}