import EventEmmiter from 'events';

const graphEvent = new EventEmmiter();

graphEvent.on('addVertex', (vertex) => {
  window.graph.addVertex(vertex);
  console.log('vertex added', window.graph);
});

export default graphEvent;