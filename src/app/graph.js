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
    this.vertices.push(vertex);
    this.adjacencyMatrix = this.adjacencyMatrix.map(x => { x.push(0); return x; });
    this.adjacencyMatrix.push(Array(this.adjacencyMatrix.length + 1).fill(0));
  }
  addEdge({ edge }) {
    this.edges.push(edge);

  }

}
export default Graph;