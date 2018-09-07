import EventEmmiter from 'events';
import Graph from './graph';

const graphEvent = new EventEmmiter();

graphEvent.on('addVertice', ({ vertex }) => {
  let graph = new Graph(localStorage.getItem(graph), localStorage.getItem('vertices'));
  localStorage.setItem('vertices', graph.vertices.push(vertex));
});

export default graphEvent;