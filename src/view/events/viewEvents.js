import EventEmmiter from 'events';

const viewEvent = new EventEmmiter();

viewEvent.on('populateSelect', () => {
  const selects = document.querySelectorAll('.select-vertex');
  console.log(selects);
  selects.forEach((item, i) => {
    selects[i].options.length = 1;
    window.graph.vertices.forEach((item) => {
      let option = document.createElement('option');
      option.name = item;
      option.text = item;
      option.value = item;
      selects[i].add(option);
    });
  });
});

viewEvent.on('populateSelectEdge', () => {
  const selects = document.querySelectorAll('.select-edge');
  console.log(selects);
  selects.forEach((item, i) => {
    selects[i].options.length = 1;
    window.graph.edges.forEach((item) => {
      console.log(item);
      let option = document.createElement('option');
      option.name = item.toString();
      option.text = item.toString();
      option.value = item.toString();
      selects[i].add(option);
    });
  });
});

viewEvent.on('enableEdgesInput', () => {
  const button = document.getElementById('createEdgesSubmitButton');
  button.disabled = false;
});

viewEvent.on('enableDeleteVertexInput', () => {
  const button = document.getElementById('deleteVertexSubmitButton');
  button.disabled = false;
});
viewEvent.on('enableDeleteEdgeInput', () => {
  const button = document.getElementById('deleteEdgeSubmitButton');
  button.disabled = false;
});

export default viewEvent;
