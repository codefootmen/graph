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
        if(vertex !== ""){
          delete this[vertex];
        }
    }

    delEdge({ edge }) {

    }

    getInDegree({ vertex }) {
        if(vertex){
            return 'works';
        }
        return '';
    }

    getOutDegree({ vertex }) {
        if(vertex){
            return 'works';
        }
        return '';
    }

    getOrder() {
        return Object.keys(this).length;
    }
}
export default Graph;
