import amg from '../app/adjacencyMatrixGraph';
const ButtonEvents = () => {
  document.getElementById('show-graph').addEventListener('click', (e) => {
    e.preventDefault();
    let matrix = new amg();
    let adjM = matrix.create(window.graph);
    console.log(adjM);
    let print = '</br>';
    adjM.forEach(x => {
      x.forEach((y, j) => print += (j != x.length - 1) ? y + '&nbsp - &nbsp' : y + '</br>');
    });
    document.getElementById('canvas').innerHTML = print;
  });
};

export default ButtonEvents;