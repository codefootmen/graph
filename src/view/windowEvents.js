const WindowEvents = () => {
  window.addEventListener("load", () => {
    document.getElementById('createVertices').onsubmit = e => {
      e.preventDefault();

      const formData = new FormData(e.target);
      let values = {};
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1]);
      console.log(values);

      document.getElementById("verticesCheckboxes").innerHTML = "";
      if (document.getElementById("submit")){
        document.getElementById("verticesCheckboxes").parentElement.removeChild(document.getElementById("submit"));
      }
      let i;
      for (i = 0; i < values.vertices; i++) {
        document.getElementById("verticesCheckboxes").innerHTML += `
        <label class="col s3">
        <input type="checkbox" name="vertex-${i}" class="filled-in" />
        <span>${i}</span>
        </label>
        `;
      }

      document.getElementById("verticesCheckboxes").parentElement.innerHTML += '<button type="submit" id="submit" class="waves-effect waves-light btn ">Create</button>';
      return false;
    }
  });

  window.addEventListener("load", () => {
    document.getElementById('createEdges').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let values = {};
      Array.from(formData.entries()).forEach(x => values[x[0]] = x[1]);
      console.log(values);

      return false;
    }
  });
}

export default WindowEvents;