import EventEmmiter from 'events';

const viewEvent = new EventEmmiter();

viewEvent.on('enableEdgesInput', () => {
  const form = document.getElementById('createEdges');
  const button = document.getElementById('createEdgesSubmitButton');
  const selects = form.querySelectorAll('select');
  console.log(selects);

  selects.forEach((item, i) => {
    selects[i].options.length = 0;
    window.graph.vertices.forEach((item) => {
      let option = document.createElement('option');
      option.name = item;
      option.text = item;
      option.value = item;
      selects[i].add(option);
    });
  });

  button.disabled = false;

});

viewEvent.on('populateInDegreeSelect', () => {
  const divInDegree = document.getElementById('calcInDegree');
  const selects = divInDegree.querySelectorAll('select');
  console.log(selects);

  selects.forEach((item, i) => {
    selects[i].options.length = 0;
    window.graph.vertices.forEach((item) => {
      let option = document.createElement('option');
      option.name = item;
      option.text = item;
      option.value = item;
      selects[i].add(option);
    });
  });
});
export default viewEvent;