import Vertex from './Vertex'
class Graph {

    addVertex({ vertex }) {
        if (vertex !== "" && !this.hasOwnProperty(vertex)) {
            this[vertex] = Array(0);
        }
    }

    addEdge({ start, end, cost, id}) {
        this[start].push(new Vertex(end, cost, id));
    }

    delVertex({ vertex }) {
        if (vertex !== "") {
            delete this[vertex];
        }
    }

    delEdge({ start, end }) {
        this[start] = this[start].filter(x => { console.log(x); return (x.name == end) ? false : true });
    }

    getInDegree({ vertex }) {
        if (vertex) {
            var count = 0;
            Object.keys(this).forEach((vx) => {
                if (vx != vertex) {
                    this[vx].forEach(edge => {
                        if (edge.name == vertex) {
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
                if (t != x) {
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
            if (i == 0) {
                degree = this.getOutDegree({ vertex: vx }) + this.getInDegree({ vertex: vx });
            } else {
                if (degree != (this.getOutDegree({ vertex: vx }) + this.getInDegree({ vertex: vx }))) {
                    regular = false;
                }
            }
        });
        return regular;
    }

    isDirected() {
        for(let key of Object.keys(this)) {
            for(let edge of this[key]) {
                if(this.readVertex(edge) != true){
                    return false;
                }
            }
        };
        return true;
    }

    readVertex(soughtEdge) {
        for(let edge of this[soughtEdge.name] ) {
            if(edge.id === soughtEdge.id){
                return true;
            }
        };
        return false;
    }
}
export default Graph;
