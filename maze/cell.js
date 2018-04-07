class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  static removeWalls(c, n) {
    let dx = c.i - n.i;
    if (dx === 1) {
      c.walls[3] = false;
      n.walls[1] = false;
    } else if (dx === -1) {
      c.walls[1] = false;
      n.walls[3] = false;
    }
    let dy = c.j - n.j;
    if (dy === 1) {
      c.walls[0] = false;
      n.walls[2] = false;
    } else if (dy === -1) {
      c.walls[2] = false;
      n.walls[0] = false;
    }
  }

  show() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);

    if (this.walls[0]) { // top
      line(x, y, x + w, y);
    }
    if (this.walls[1]) { // right
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) { // bottom
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) { // left
      line(x, y + w, x, y);
    }


    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  }

  highlight() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }

  checkNeighbors() {
    let neighbors = [];
    let top = grid[index(this.i, this.j - 1)]
    let right = grid[index(this.i + 1, this.j)]
    let bottom = grid[index(this.i, this.j + 1)]
    let left = grid[index(this.i - 1, this.j)]

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = Math.floor(random(0, neighbors.length));
      return [neighbors[r], neighbors.length];
    } else {
      return [undefined, neighbors.length];
    }
  }
}