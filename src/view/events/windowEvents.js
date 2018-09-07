const WindowEvents = (graphEvent) => {
  window.addEventListener('load', () => {
    document.getElementById('createVertices').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {
        vertex: ''
      };
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1].trim());
      if (values.vertex.trim() === '') {
        return false;
      } else {
        graphEvent.emit('addVertice', values);
        console.log(values);
        window.graph.createVertices(Array.from({ length: values.vertices }, (v, k) => k));
        
        document.getElementById('verticesCheckboxes').innerHTML = '';
        if (document.getElementById('submit')) {
          document.getElementById('verticesCheckboxes').parentElement.removeChild(document.getElementById('submit'));
        }
        let i;
        document.getElementById('verticesCheckboxes').innerHTML += `
        <div class="select is-success is-medium">
        <select id="select-a" name="select-a" form="createEdges">
        </select>
        </div>
        <div class="select is-success is-medium">
        <select id="select-b" name="select-b" form="createEdges"">
        </select>
        </div>
        `;
        for (i = 0; i < values.vertices; i++) {
          document.getElementById('select-a').innerHTML += `
          <option value="${i}" name="${i}">${i}</option>
          `;
          document.getElementById('select-b').innerHTML += `
          <option value="${i}" name="${i}">${i}</option>
          `;
        }
        document.getElementById('verticesCheckboxes').parentElement.innerHTML += '<button type="submit" id="submit" class="button is-primary is-outlined">Create</button>';
        return false;
      }
    };
  });
  window.addEventListener('load', () => {
    document.getElementById('createEdges').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {};
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1]);
      let edges = [];
      for (let key in values) {
        edges.push(values[key]);
      }
      window.graph.addEdge(edges);
      console.log(window.graph);
      return false;
    };
  });
};

export default WindowEvents;