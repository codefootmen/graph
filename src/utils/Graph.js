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

    depthFirst({ start, end }) {
        let visited = [];
        let search = function (from, to, visited, g) {
            visited.push(from);
            if (from === to) {
                console.log(visited);
                return visited;
            }
            if (g[from] !== undefined) {
                for (let neighbor of g[from]) {
                    if (!visited.includes(neighbor.name)) {
                        return search(neighbor.name, to, visited, g);
                    }
                }
            }
        }
        return search(start, end, visited, this);
    }

    breadthFirst({ start, end }) {
        let visited = [];
        visited.push(start);
        let list = [];
        list.push(start);

        while (list.length > 0) {
            let i = list.shift();

            for (let neighbor of this[i]) {
                if (!visited.includes(neighbor.name)) {
                    visited.push(neighbor.name);
                    if (end === neighbor.name) {
                        return visited;
                    }
                    list.push(neighbor.name);

                }
            }

        }

    }

    kruskal() {
        //-------------------------------//

        let edges = [];
        let chain = [];

        let checkInArray = (x, y) => {
            let go = false;
            x.forEach(z => {
                if ((z[0] === y[0] || z[0] === y[1]) && (z[1] === y[1] || z[1] === y[0])) {
                    go = true;
                }
            })
            return go;
        }

        Object.keys(this).forEach(x => {
            edges = edges.concat(this[x].map(y => { return [x, y.name, y.cost] }));
        });

        edges.forEach(x => {
            if (!checkInArray(chain, x)) {
                chain.push(x);
            }
        });

        chain.sort(function (a, b) { return a[2] - b[2] })
        let numberOfVertices = Object.keys(this).length;
        let minimumTreeGenerator = [];
        //---------------------------------//
        let findVal = (c, curr) => {
            let val;
            c.forEach(x => {
                if (x[0] === curr) {
                    val = x[1];
                }
            });
            return val;
        }

        let merge = (c, curr, uValue) => {
            return c.map(x => {
                if ((x[0] === curr)) {
                    x[1] = uValue;
                }
                return x;
            });
        }

        let components = Object.keys(this).map((x, i) => [x, i]);
        while (minimumTreeGenerator.length < (numberOfVertices) && chain.length > 0) {
            let currVertex = chain.shift();
            let uValue = findVal(components, currVertex[0]);
            let vValue = findVal(components, currVertex[1]);

            if (uValue !== vValue) {
                components = merge(components, currVertex[1], uValue);
                minimumTreeGenerator = [...new Set([...minimumTreeGenerator, ...[currVertex[0], currVertex[1]]])]
            }
        }
        return minimumTreeGenerator;
    }

    prim() {
        let edgesMinimumTreeGenerator = [];
        let vertices = Object.keys(this);
        let verticesMinimumTreeGenerator = [vertices.shift()];

        while (verticesMinimumTreeGenerator.length < Object.keys(this).length) {
            let attemmpt = {};
            attemmpt.cost = Infinity;

            for (let vertex of verticesMinimumTreeGenerator) {
                for (let neighbor of this[vertex]) {
                    if (vertices.includes(neighbor.name)) {
                        if (neighbor.cost < attemmpt.cost) {
                            attemmpt.start = neighbor.name;
                            attemmpt.end = vertex;
                            attemmpt.cost = neighbor.cost;
                        }
                    }
                }
            }
            vertices = vertices.filter(x => x !== attemmpt.start);
            edgesMinimumTreeGenerator = [...new Set([...edgesMinimumTreeGenerator, ...[attemmpt.start, attemmpt.end]])];
            verticesMinimumTreeGenerator.push(attemmpt.start);
        }
        return edgesMinimumTreeGenerator;
    }

    transitiveClosure({ vertex }) {
        let visited = [];

        let search = function (from, visited, g) {
            visited.push(from);
            if (g[from] !== undefined && g[from].length > 0) {
                for (let neighbor of g[from]) {
                    if (!visited.includes(neighbor.name)) {
                        search(neighbor.name, visited, g);
                    }
                }
            }
        }
        search(vertex, visited, this);

        return visited;
    }

    inverseTransitiveClosure({ vertex }) {
        let visited = [];

        let has = (x, y) => {
            let response = false;
            x.forEach(z => {
                if (z.name === y) {
                    response = true;
                }
            });
            return response;
        };

        let search = function (current, visited, g) {
            visited.push(current);
            for (let gVertex of Object.keys(g)) {
                if (has(g[gVertex], current)) {
                    if (!visited.includes(gVertex)) {
                        search(gVertex, visited, g);
                    }
                }
            }
        }
        search(vertex, visited, this);

        return visited;
    }

    malgrange({ vertex }) {
        let tC = this.transitiveClosure({ "vertex": vertex });
        let iTC = this.inverseTransitiveClosure({ "vertex": vertex });
        let intersection = tC.filter(n => { return iTC.indexOf(n) !== -1 });

        return intersection;
    }
}

export default Graph;
