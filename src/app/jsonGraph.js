class JsonGraph {
  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }

  createVertices(vertices){
    this.vertices = vertices;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  get getGraph() {
    return { vertices: this.vertices, edges: this.edges };
  }


}

export default JsonGraph;