const { syncReadFile } = require("../readFiles");

const sampleInputs = syncReadFile("./js/day12/sampleInput.txt");
const inputs = syncReadFile("./js/day12/input.txt");

console.log(sampleInputs);
console.log(inputs);

function getValue(letter) {
  if (letter === "E") {
    return "z".charCodeAt(0) - 96;
  }
  if (letter === "S") {
    return "a".charCodeAt(0) - 96;
  }
  return letter.charCodeAt(0) - 96;
}

const LEGAL_MOVES = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const getArrow = (action) => {
  if (action[0] === 1) {
    return "↓";
  }
  if (action[0] === -1) {
    return "↑";
  }
  if (action[1] === 1) {
    return "→";
  }
  if (action[1] === -1) {
    return "←";
  }
};

class Node {
  constructor(state, cord) {
    this.action = [];
    this.state = state;
    this.cord = cord;
    this.g = 0;
    this.h = 0;
    this.parent = null;
  }
  getState() {
    return `${this.state}_${this.cord.join("_")}`;
  }
}

class Grid {
  constructor(inputs) {
    let grid = parseInput(inputs);
    this.grid = grid;
    this.map = this.createEmptyMap(grid);
    this.end = this.getPoint(grid);
    this.start = this.getPoint(grid, "S") || [0, 0];
  }

  getPoint = (grid, point = "E") => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === point) {
          return [i, j];
        }
      }
    }
  };

  getAllSamePoints(point = "a") {
    const points = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === point) {
          points.push([i, j]);
        }
      }
    }
    return points;
  }

  estimateCost = (start) => {
    const s = this.grid[start[0]][start[1]];
    const e = this.grid[this.end[0]][this.end[1]];
    return (
      (Math.abs(start[0] - this.end[0]) + Math.abs(start[1] - this.end[1])) *
        getValue(e) -
      getValue(s)
    );
  };

  getMovementCost = (start, end) => {
    const s = this.grid[start[0]][start[1]];
    let e = this.grid[end[0]][end[1]];
    const diff = getValue(e) - getValue(s);
    return diff === 0 ? 1 + 1 : diff + 1;
  };

  getLegalActions = (node) => {
    const height = this.grid.length;
    const width = this.grid[0].length;
    const actions = [];
    for (let i = 0; i < LEGAL_MOVES.length; i++) {
      let action = LEGAL_MOVES[i];
      let newState = [node.cord[0] + action[0], node.cord[1] + action[1]];
      if (
        newState[0] >= 0 &&
        newState[0] < height &&
        newState[1] >= 0 &&
        newState[1] < width
      ) {
        if (this.getMovementCost(node.cord, newState) <= 2) {
          actions.push(action);
        }
      }
    }
    return actions;
  };
  resetMap = () => {
    this.map = this.createEmptyMap(this.grid);
  };
  createEmptyMap = (grid) => {
    return grid.map((row) => {
      return row.map(() => {
        return ".";
      });
    });
  };

  buildMap(path) {
    path = [...path];
    let cord = [...this.end];
    for (let i = 0; i < path.length; i++) {
      const action = path[i];
      cord[0] -= action[0];
      cord[1] -= action[1];
      const arrow = getArrow(path[i]);
      this.map[cord[0]][cord[1]] = arrow;
    }
    this.map[this.end[0]][this.end[1]] = "E";
  }

  printMap = () => {
    console.log(this.map.map((row) => row.join(" ")).join("\n") + "\n");
  };
}

const parseInput = (inputs) => {
  return inputs
    .map((input) => {
      return [...input];
    })
    .filter((input) => input.length > 0);
};

const sortOpenList = (openList) => {
  return openList.sort((a, b) => {
    if (a.h === b.h) {
      if (a.g > b.g) {
        return -1;
      }
    } else if (a.h < b.h) {
      return 1;
    }
    return 0;
  });
};

class A_Star {
  constructor(grid) {
    this.grid = grid;
    this.fullGrid = grid.grid;
    this.end = grid.end;
    this.start = grid.start;
  }

  expand(node) {
    const actions = this.grid.getLegalActions(node);
    const children = [];
    for (let i = 0; i < actions.length; i++) {
      let action = actions[i];
      let newCord = [node.cord[0] + action[0], node.cord[1] + action[1]];
      let newLetter = this.grid.grid[newCord[0]][newCord[1]];
      let newNode = new Node(newLetter, newCord);
      newNode.g = node.g + this.grid.getMovementCost(node.cord, newCord);
      newNode.h = this.grid.estimateCost(newCord);
      newNode.action = action;
      newNode.parent = node;
      children.push(newNode);
    }
    return children;
  }

  reconstructPath(node) {
    let path = [];
    while (node.parent != null) {
      path.push(node.action);
      node = node.parent;
    }
    return path;
  }

  isNodeInList(node, list) {
    for (let i = 0; i < list.length; i++) {
      if (node.getState() === list[i].getState()) {
        return true;
      }
    }
    return false;
  }

  search(startPoint) {
    let closedList = new Set();
    let openList = [];
    let start = startPoint ?? this.start;
    let letter = this.grid.grid[start[0]][start[1]];
    let startNode = new Node(letter, start);
    startNode.h = this.grid.estimateCost(start);
    openList.push(startNode);

    while (openList.length > 0) {
      let node = openList.shift();
      if (node.state === "E") {
        return this.reconstructPath(node);
      }
      if (closedList.has(node.getState())) {
        continue;
      }
      closedList.add(node.getState());
      let children = this.expand(node);
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (closedList.has(child.getState())) {
          continue;
        }
        if (this.isNodeInList(child, openList)) {
          continue;
        }
        openList.push(child);
        sortOpenList(openList);
      }
    }
  }
}

const grid = new Grid(inputs);
console.log(
  "========================================================PART 1================================================================"
);
let aStar = new A_Star(grid);
const path = aStar.search();
console.log("path", path.length);
grid.buildMap(path);
grid.printMap();
grid.resetMap();
console.log(
  "=============================================================================================================================="
);

console.log(
  "========================================================PART 2================================================================"
);
let a_start = new A_Star(grid);

const allAPoints = grid.getAllSamePoints("a");
const allPaths = allAPoints
  .filter((point) => point[0] === 0 || point[1] === 0)
  .map((point) => {
    const path = a_start.search(point);
    if (!path) return 0;
    console.log("path", path.length, "from", point);
    grid.buildMap(path);
    grid.printMap();
    grid.resetMap();
    console.log("");
    return path.length;
  })
  .filter((path) => path > 0)
  .sort((a, b) => a - b);

console.log("shortest path", allPaths);

console.log("shortest path", allPaths[0]);
