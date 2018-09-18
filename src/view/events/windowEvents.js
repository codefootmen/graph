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
        viewEvent.emit('populateSelect');
        viewEvent.emit('enableEdgesInput');
        viewEvent.emit('enableDeleteVertexInput');
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
      if(edge[0] === '' || edge[1] === ''){
        return false;
      }
      window.graph.addEdge({ 'edge': edge });
      viewEvent.emit('populateSelectEdge');
      viewEvent.emit('enableDeleteEdgeInput');
      console.log(window.graph);
      return false;
    };
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[id="selectInDegree"]').onchange = changeInDegreeEvent;
  }, false);

  function changeInDegreeEvent(event) {
    if (!event.target.value) alert('Please Select One');
    else document.getElementById('inDegree').innerHTML = window.graph.getInDegree({ vertex: event.target.value });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[id="selectOutDegree"]').onchange = changeOutDegreeEvent;
  }, false);

  function changeOutDegreeEvent(event) {
    if (!event.target.value) alert('Please Select One');
    else document.getElementById('outDegree').innerHTML = window.graph.getOutDegree({ vertex: event.target.value });
  }
  window.addEventListener('load', () => {
    document.getElementById('deleteVertex').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(Array.from(formData.entries()));
      let values = {
        vertex: ''
      };
      Array.from(formData.entries()).forEach(x => values['vertex'] = x[1].trim());
      if (values.vertex.trim() === '') {
        console.error('Empty Input');
        return false;
      } else {
        graphEvent.emit('deleteVertex', values);
        viewEvent.emit('populateSelect');
      }
    };
  });

  window.addEventListener('load', () => {
    document.getElementById('deleteEdge').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(Array.from(formData.entries()));
      let values = {
        edge: ''
      };
      Array.from(formData.entries()).forEach(x => values['edge'] = x[1].trim());
      console.log(values);

      if (values.edge[0] === '' || values.edge[1] === '') {
        console.error('Empty Input');
        return false;
      } else {
        values = values.edge.split(',');
        console.log(values);
        graphEvent.emit('deleteEdge', values);
        viewEvent.emit('populateSelectEdge');
      }
    };
  });


};

export default WindowEvents;