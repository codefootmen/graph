import JsonGraph from './app/jsonGraph';
import initViewEvents from './view';

let graph = new JsonGraph();
window.graph = graph;
if (localStorage.getItem('graph') === null){
  localStorage.setItem('vertices', ['a']);
  localStorage.setItem('graph', ['a']);
}

initViewEvents();





