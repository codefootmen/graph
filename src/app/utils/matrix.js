class Matrix {
  constructor() {

  }

  create(size) {
    return Array(size).fill().map(()=>Array(size).fill(0));
  }

}

export default Matrix;