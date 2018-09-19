import initViewEvents from './view';
import Graph from './app/graph';

if (!window.graph){
  let graph = new Graph([], []);
  window.graph = graph;
  console.log('window created', window.graph);
}

initViewEvents();





