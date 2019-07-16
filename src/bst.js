/**
 * @file bst.js
 * @author andrew he
 * @reference https://en.wikipedia.org/wiki/Binary_search_tree
 */

import Node from './node';

export default class BST {

    constructor() {
        this.root = null;
    }

    insert(value) {
        let node = new Node(value);
        if (this.root === null) {
            this.root = node;
        } else {
            let current = this.root;
            let parent = null;
            while (true) {
                parent = current;
                if (value < current.value) {
                    current = current.left;
                    if (current == null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }

    remove(value) {
        if (this.root === null) {
            return false;
        }
        let current = this.root;
        let parent = null;

        while (current !== null && current.value !== value) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (current === null) {
            return false;
        }
        if (current.left === null || current.right === null) {
            if (parent === null) {
                this.root = current.left === null ? current.right : current.left;
            } else if (parent.left === current) {
                parent.left = current.left === null ? current.right : current.left;
            } else {
                parent.left = current.left === null ? current.right : current.left;
            }
        } else {
            let mid = current.right;
            parent = current;
            while (mid.left !== null) {
                parent = mid;
                mid = mid.left;
            }
            current.value = mid.value;
            if (parent.left === mid) {
                parent.left = mid.left;
            } else {
                parent.right = mid.right;
            }
        }
        return true;
    }

    search(value) {
        let current = this.root.copy();
        while (!current) {
            if (value === current.value) {
                return current;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    max() {
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        return current;
    }

    min() {
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    toString() {
        this.traverse(this.root, node => console.log(node.value));
    }

    levelPrint(node) {
        if (node === null) {
            return;
        }
        let Q = [];
        Q.push(node);
        while (Q.length > 0) {
            let cnt = Q.length;
            let currentLevel = [];
            while (cnt > 0) {
                let current = Q.pop();
                currentLevel.push(current.value);
                (current.right !== null) && Q.push(current.right);
                (current.left !== null) && Q.push(current.left);
                --cnt;
            }
            console.log(...currentLevel);
            console.log('\n');
        }
    }
    
    maxDepth(node) {
        if (node === null) {
            return 0;
        } else {
            let leftDepth = this.maxDepth(node.left);
            let rightDepth = this.maxDepth(node.right);
            return (leftDepth > rightDepth) ? leftDepth + 1 : rightDepth + 1;
        }
    }


    traverse(node, cb) {
        if (!node) {
            return;
        }
        this.traverse(node.left, cb);
        cb.call(this, node);
        this.traverse(node.right, cb);
    }

    isBST(node, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
        if (!node) {
            return true;
        }
        if (node.value < min || node.value > max) {
            return false;
        }
        return this.isBST(node.left, min, node.value - 1) && this.isBST(node.right, node.value + 1, max);
    }
}


// var B = new BST();
// B.insert(11);
// B.insert(1);
// B.insert(5);
// B.insert(7);
// B.insert(15);
// B.insert(2);

// B.levelPrint(B.root);
// B.toString();

// console.log('------');
// console.log(B.min().value);
// console.log(B.max().value);
// console.log('------');
// B.toString();
// console.log('------');
// B.remove(5);
// B.levelPrint(B.root);