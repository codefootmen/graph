const WindowEvents = (graphEvent, viewEvent) => {
  window.addEventListener('load', () => {
    document.getElementById('createVertices').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {
        vertex: ''
      };
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1].trim());
      if (values.vertex.trim() === '') {
        console.error('Empty Input');
        return false;
      } else {
        console.log(values);
        graphEvent.emit('addVertex', values);
        viewEvent.emit('enableEdgesInput');
        viewEvent.emit('populateInDegreeSelect');
        viewEvent.emit('populateOutDegreeSelect');
      }
    };
  });
  window.addEventListener('load', () => {
    document.getElementById('createEdges').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {};
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1]);
      let edge = [];
      for (let key in values) {
        edge.push(values[key]);
      }
      console.log(edge);
      window.graph.addEdge({ 'edge': edge });
      console.log(window.graph);
      return false;
    };
  });


  document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="selectInDegree"]').onchange=changeInDegreeEvent;
  },false);

  function changeInDegreeEvent(event) {
    if(!event.target.value) alert('Please Select One');
    else document.getElementById('inDegree').innerHTML = window.graph.getInDegree({vertex: event.target.value});
  }

  document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="selectOutDegree"]').onchange=changeOutDegreeEvent;
  },false);

  function changeOutDegreeEvent(event) {
    if(!event.target.value) alert('Please Select One');
    else document.getElementById('outDegree').innerHTML = window.graph.getOutDegree({vertex: event.target.value});
  }
};

export default WindowEvents;