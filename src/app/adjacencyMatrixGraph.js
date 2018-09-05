import Matrix from './utils/matrix';

class AdjacencyMatrixGraph {
  constructor() {

  }
  create(json) {
    const graph = new Matrix().create(json.vertices.length);
    json.edges.forEach((edge) => {
      graph[edge[0]][edge[1]] += 1;
    });
    return graph;
  }
}

export default AdjacencyMatrixGraph;