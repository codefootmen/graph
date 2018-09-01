import amg from '../app/adjacencyMatrixGraph';
const ButtonEvents = () => {
  document.getElementById('show-graph').addEventListener('click', (e) => {
    e.preventDefault();
    let matrix = new amg();
    let adjM = matrix.create(window.graph);
    console.log(adjM);
    let print = '';
    for (let i = 0; i < adjM.length; i++) {
      for (let j = 0; j < adjM.length; j++) {
        if (j == (adjM.length - 1)) {
          print += adjM[i][j] + '</br>';
        } else {
          print += adjM[i][j] + ', ';
        }
      }
    }

    document.getElementById('canvas').innerHTML = print;
  });
};

export default ButtonEvents;