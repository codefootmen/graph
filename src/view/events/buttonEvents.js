const ButtonEvents = () => {
  document.getElementById('show-graph').addEventListener('click', (e) => {
    e.preventDefault();
    let adjM = window.graph.getAdjacencyMatrix();

    let print = '</br>';
    adjM.forEach(x => {
      x.forEach((y, j) => print += (j != x.length - 1) ? y + '&nbsp - &nbsp' : y + '</br>');
    });
    document.getElementById('canvas').innerHTML = print;

    document.getElementById('order').innerHTML = window.graph.getOrder();
  });
};

export default ButtonEvents;