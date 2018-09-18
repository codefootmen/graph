import EventEmmiter from 'events';

const graphEvent = new EventEmmiter();

graphEvent.on('addVertex', (vertex) => {
  window.graph.addVertex(vertex);
  console.log('vertex added', window.graph);
});
graphEvent.on('deleteVertex', (vertex)=>{
  window.graph.delVertex(vertex);
  console.log('vertex deleted', window.graph);
});

export default graphEvent;