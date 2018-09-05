const WindowEvents = () => {
  window.addEventListener('load', () => {
    document.getElementById('createVertices').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {};
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1]);
      console.log(values);
      window.graph.createVertices(Array.from({ length: values.vertices }, (v, k) => k));
      document.getElementById('verticesCheckboxes').innerHTML = '';
      if (document.getElementById('submit')) {
        document.getElementById('verticesCheckboxes').parentElement.removeChild(document.getElementById('submit'));
      }
      let i;
      document.getElementById('verticesCheckboxes').innerHTML += `
      <div class="input-field column">
        <select class="browser-default" id="select-a" name="select-a" form="createEdges">
        </select>
      </div>
      <div class="input-field column">
        <select class="browser-default" id="select-b" name="select-b" form="createEdges"">
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
      document.getElementById('verticesCheckboxes').parentElement.innerHTML += '<button type="submit" id="submit" class="waves-effect waves-light btn ">Create</button>';
      return false;
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