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
            var contadora = 0;
            Object.keys(this).forEach((x) => {
                console.log();
                for (var i in Object.x) {
                    console.log(Object.x[i].name);
                    if (Object.x[i].name == vertex) {
                        contadora++;
                    }
                }
            })

            /* if(x!=[]){
            x.forEach((y)=>{
                if(y == vertex){
                contadora++;
            }
            })
            }*/

            /*    entrar na lista de cada objeto
            verificar se endVertex = vertex
            entao contadora++
            */
            return contadora;

        }
        return '';
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
