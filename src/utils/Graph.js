import Vertex from './Vertex'

class Graph {

    addVertex({ vertex }) {
        if (vertex !== "" && !this.hasOwnProperty(vertex)) {
            this[vertex] = Array(0);
        }
    }

    addEdge({ start, end, cost, id }) {
        this[start].push(new Vertex(end, cost, id));
    }

    delVertex({ vertex }) {
        if (vertex !== "") {
            delete this[vertex];
        }
    }

    delEdge({ start, end }) {
        this[start] = this[start].filter(x => { console.log(x); return (x.name === end) ? false : true });
    }

    getInDegree({ vertex }) {
        if (vertex) {
            var count = 0;
            Object.keys(this).forEach((vx) => {
                if (vx !== vertex) {
                    this[vx].forEach(edge => {
                        if (edge.name === vertex) {
                            count++;
                        }
                    })
                }
            })
            return count;
        }
        return 0;
    }

    getOutDegree({ vertex }) {
        if (vertex) {
            return this[vertex].length;
        }
        return 0;
    }

    getOrder() {
        return Object.keys(this).length;
    }

    isComplete() {
        let contains = true;
        Object.keys(this).forEach((x) => {
            Object.keys(this).forEach((t) => {
                if (t !== x) {
                    if (!this[x].map(d => d.name).includes(t)) {
                        contains = false;
                    }
                }
            });
        })
        return contains;
    }

    isRegular() {
        let degree = 0;
        let regular = true;
        Object.keys(this).forEach((vx, i) => {
            if (i === 0) {
                degree = this.getOutDegree({ vertex: vx }) + this.getInDegree({ vertex: vx });
            } else {
                if (degree !== (this.getOutDegree({ vertex: vx }) + this.getInDegree({ vertex: vx }))) {
                    regular = false;
                }
            }
        });
        return regular;
    }

    isDirected() {
        for (let key of Object.keys(this)) {
            for (let edge of this[key]) {
                if (this.readVertex(edge) !== true) {
                    return false;
                }
            }
        };
        return true;
    }

    readVertex(soughtEdge) {
        for (let edge of this[soughtEdge.name]) {
            if (edge.id === soughtEdge.id) {
                return true;
            }
        };
        return false;
    }

    dijkstra(start, end) {
        if (!start || !end) {
            return false;
        }

        let visited = [];
        let unvisited = [];

        Object.keys(this).forEach(x => {
            (x !== start) ? unvisited = unvisited.concat([[x, Infinity]]) :
                unvisited = unvisited.concat([[x, 0]])
        });

        let findCost = (list, vertex) => {
            for (let pair of list) {
                if (pair[0] === vertex) {
                    return Number(pair[1]);
                }
            }
        }

        let updateCost = (list, vertex, cost) => {
            list[list.findIndex(x => x[0] === vertex)][1] = cost;
        }

        while (unvisited.length > 0) {
            console.log("hit");
            unvisited.sort((a, b) => a[1] - b[1]);
            if (unvisited[0][0] === end) {
                visited.push(unvisited.shift());
                return visited;
            }
            for (let neighbor of this[unvisited[0][0]]) {
                if (Number(findCost(unvisited, neighbor.name)) > Number(neighbor.cost) + findCost(unvisited, unvisited[0][0])) {
                    updateCost(unvisited, neighbor.name, Number(neighbor.cost) + findCost(unvisited, unvisited[0][0]));
                }
            }
            visited.push(unvisited.shift());
        }
        return visited;
    }

    kruskal() {
        var MakeSet = require("union-find");

        let vertices = this.vertex;
        let edges = this.edge;
        let metric = this.edge.cost;


        let finalEdge = [];

        let forest = new MakeSet(vertices.length);

        let edgeDist = [];
        for (let ind in edges) {
            let u = edges[ind][0];
            let v = edges[ind][1];
            let e = { edge: edges[ind], weight: metric(vertices[u], vertices[v]) };
            edgeDist.push(e);
        }

        edgeDist.sort(function (a, b) { return a.weight - b.weight; });

        for (let i = 0; i < edgeDist.length; i++) {
            let u = edgeDist[i].edge[0];
            let v = edgeDist[i].edge[1];

            if (forest.find(u) !== forest.find(v)) {
                finalEdge.push([u, v]);
                forest.link(u, v);
            }
        }

        return finalEdge;

    }
    prim() {
        var DHeap = require('d-heap');
        let edges = Object.edge;
        let mst = [],
            nodes = [],
            queue,
            edge, node, adjacent, v, u, w, vn, un, i, l;

        for (i = 0, l = edges.length; i < l; ++i) {
            edge = edges[i];
            v = edge[0];
            u = edge[1];
            w = edge[2];

            vn = nodes[v] ||
                (nodes[v] = { v: v, w: Infinity, p: null, visited: false, adjacent: [] });
            un = nodes[u] ||
                (nodes[u] = { v: u, w: Infinity, p: null, visited: false, adjacent: [] });

            vn.adjacent[u] = w;
            un.adjacent[v] = w;
        }

        queue = new DHeap([nodes[edges[0][0]]], {
            compare: function (a, b) {
                return (b != null ? b.w : 0) - (a != null ? a.w : 0);
            }
        });

        while (v = queue.pop()) {
            v.visited = true;
            adjacent = v.adjacent;

            for (i = 0, l = adjacent.length; i < l; ++i) {
                w = adjacent[i];
                if (!w) continue;
                u = nodes[i];

                if (!u.visited && w < u.w) {
                    u.w = w;
                    u.p = v;
                    queue.insert(u);
                }
            }
        }

        for (i = 0, l = nodes.length; i < l; ++i) {
            node = nodes[i];

            if (node.p) {
                mst.push([node.v, node.p.v, node.w]);
            }
        }

        return mst;
    };
}
export default Graph;
