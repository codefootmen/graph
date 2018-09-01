import JsonGraph from './app/jsonGraph';
import WindowEvents from './view/windowEvents';
import ButtonEvents from './view/buttonEvents';

let graph = new JsonGraph();
window.graph = graph;

WindowEvents();
ButtonEvents();





