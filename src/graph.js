/**
 * @file graph.js
 * @author andrew he
 */
import Edge from './edge';
import Node from './node';

export default class Graph {

    constructor() {
        this.nodes = [];
        this.edges = {};
    }

    init(objs) {
        for (const obj of objs) {
            this.addNode(new Node(obj));
        }
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }

    deleteNode(node) {
        const idx = this.nodes.indexOf(node);
        this.nodes.splice(idx, 1);
    }

    addEdge(node1, node2, weight) {
        this.edges[node1].push(new Edge(node2, weight));
        this.edges[node2].push(new Edge(node1, weight));
    }

    addDirectedEdge(from, to, weight) {
        this.edges[from].push(new Edge(to, weight));
    }

    deleteEdge(node, edge) {
        const idx = node.edges.indexOf(edge);
        node.edges.splice(idx, 1);
    }

    bfs(node, target) {
        this._reset();
        let Q = [];
        Q.push(node);
        node.searched = true;
        while (Q.length > 0) {
            let current = Q.shift();
            if (current === target) {
                return current;
            }
            for (let neighbor of current.edges) {
                if (!neighbor.searched) {
                    neighbor.searched = true;
                    neighbor.parent = current;
                    Q.push(neighbor);
                }
            }
        }
        return null;
    }

    dfs(node, target) {
        this._reset();
        const S = [];
        S.push(node);
        while (S.length > 0) {
            let current = S.pop();
            if (current === target) {
                return current;
            }
            if (!current.searched) {
                current.searched = true;
                for (let neighbor of current.edges) {
                    S.push(neighbor);
                }
            }
        }
        return null;
    }

    topoSort() {
        this._reset();
        let S = [];
        for(let node of this.nodes) {
            if (!node.searched) {

            }
        }
    }

    _topoHelper(node, S) {
        node.searched = true;
        
    }


    isCyclic() {}

    _contains(node) {

    }

    _reset() {
        for(const node of this.nodes) {
            node.searched = false;
            node.parent = null;
        }
    }

}



