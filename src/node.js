/**
 * @file node.js
 * @author andrew he 
 */

export default class Node {

    constructor(value) {
        this.value = value;
        this.parent = null;
        this.searched = false;
        // tree node
        this.left = null;
        this.right = null;

        // graph node
        this.prev = null;
        this.next = null;
    }

    copy() {
        return this.clone();
    }

    clone() {
        return new Node(this.value);
    }
}