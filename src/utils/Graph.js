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

            /* if(x!=[]){
            x.forEach((y)=>{
                if(y == vertex){
                count++;
            }
            })
            }*/

            /*    entrar na lista de cada objeto
            verificar se endVertex = vertex
            entao count++
            */
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
}
export default Graph;
