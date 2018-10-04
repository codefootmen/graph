import Vertex from './Vertex'
class Graph {

    addVertex({ vertex }) {
        if (vertex !== "" && !this.hasOwnProperty(vertex)) {
            this[vertex] = Array(0);
        }
    }

    addEdge({ start, end, cost }) {
        this[start].push(new Vertex(end, cost));
    }

    delVertex({ vertex }) {
        if (vertex !== "") {
            delete this[vertex];
        }
    }

    delEdge({ edge }) {

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
        return '';
    }

    getOrder() {
        return Object.keys(this).length;
    }

    isComplete() {

        let contains = true;
        Object.keys(this).forEach((x) => {
            Object.keys(this).forEach((t) => {
                console.log(this[x], new Vertex(t, 0))
                if (t != x) {
                    if (!this[x].map(d => d.name).includes(t)) {
                        contains = false;
                    }
                }
            });
        })
        return contains;
    }
}
export default Graph;
