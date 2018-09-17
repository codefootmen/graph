import Matrix from './utils/matrix';

class Graph {
  constructor(adjacencyMatrix, vertices) {
    this.adjacencyMatrix = new Matrix().create(0);
    this.vertices = vertices;
    this.edges = [];
  }
  jsonToAdjacencyMatrix(json) {
    const graph = new Matrix().create(json.vertices.length);
    json.edges.forEach((edge) => {
      graph[edge[0]][edge[1]] += 1;
    });
    return graph;
  }
  getAdjacencyMatrix() {
    return this.adjacencyMatrix;
  }
  addVertex({ vertex }) {
    if(this.vertices.indexOf(vertex) > -1){
      return false;
    };
    this.vertices.push(vertex);
    this.adjacencyMatrix = this.adjacencyMatrix.map(x => { x.push(0); return x; });
    this.adjacencyMatrix.push(Array(this.adjacencyMatrix.length + 1).fill(0));
  }
  addEdge({ edge }) {
    this.edges.push(edge);
    const firstVertexPosition = this.vertices.findIndex(value => value === edge[0]);
    const secondVertexPosition = this.vertices.findIndex(value => value === edge[1]);
    this.adjacencyMatrix[firstVertexPosition][secondVertexPosition] += 1;
  }
  getInDegree({ vertex }) {
    let degree = 0;
    const vertexIndex = this.vertices.findIndex(value => value === vertex);
    this.adjacencyMatrix.forEach((row) =>{
      degree += row[vertexIndex];
    });
    return degree;
  }
  getOrder() {
    let order = 0;
    this.adjacencyMatrix.forEach((row) => {
      order += row.reduce((acc, el) => acc + el);
    });
    return order;
  }
}
export default Graph;