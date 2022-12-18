const inputs = require("fs")
  .readFileSync("./js/day14/input.txt", "utf-8")
  .split(/\r?\n/)
  .filter((line) => line);

const printMap = (grid, { xoffSet, xoffSetMax, yoffSetMax }) => {
  grid[`${500}_${0}`] = `+`;
  let map = "";
  for (let i = 0; i <= yoffSetMax + 2; i++) {
    for (let j = xoffSet; j <= xoffSetMax; j++) {
      map += grid[`${j}_${i}`] || ".";
    }
    map += "\n";
  }
  console.log(map);
};
const parsePath = (path) => {
  const rockCords = path.split("->");
  return rockCords.map((cords) => cords.split(",").map((cord) => Number(cord)));
};

const findMinMax = (paths, floor) => {
  let xoffSet = Number.POSITIVE_INFINITY;
  let xoffSetMax = Number.NEGATIVE_INFINITY;
  let yoffSetMax = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    for (let j = 0; j < path.length; j++) {
      let [x, y] = path[j];
      if (x > xoffSetMax) xoffSetMax = x;
      if (x < xoffSet) xoffSet = x;
      if (y > yoffSetMax) yoffSetMax = y;
    }
  }
  if (floor) {
    xoffSet = Math.min(500 - (yoffSetMax + 3), xoffSet - yoffSetMax + 3);
    xoffSetMax = Math.max(500 + (yoffSetMax + 3), yoffSetMax + 3 - xoffSet);
    yoffSetMax += 2;
  }
  return { xoffSet, xoffSetMax, yoffSetMax };
};

const buildMap = (paths, { xoffSet, xoffSetMax, yoffSetMax }, floor) => {
  let grid = {};
  paths.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      let [x1, y1] = path[i];
      let [x2, y2] = path[i + 1];

      if (x1 === x2) {
        if (y1 < y2) {
          for (let j = y1; j <= y2; j++) {
            grid[`${x1}_${j}`] = `#`;
          }
        } else if (y1 > y2) {
          for (let j = y2; j <= y1; j++) {
            grid[`${x1}_${j}`] = `#`;
          }
        }
      } else if (x1 < x2) {
        for (let j = x1; j <= x2; j++) {
          grid[`${j}_${y1}`] = `#`;
        }
      } else if (x1 > x2) {
        for (let j = x2; j <= x1; j++) {
          grid[`${j}_${y1}`] = `#`;
        }
      }
    }
  });
  for (let i = xoffSet; i <= xoffSetMax; i++) {
    for (let j = 0; j <= yoffSetMax; j++) {
      if (!grid[`${i}_${j}`]) {
        grid[`${i}_${j}`] = ".";
      }
    }
  }

  if (floor) {
    for (let i = xoffSet; i <= xoffSetMax; i++) {
      grid[`${i}_${yoffSetMax}`] = "#";
    }
  }
  return grid;
};

function simulate(paths, floor = false) {
  const { xoffSet, xoffSetMax, yoffSetMax } = findMinMax(paths, floor);
  const grid = buildMap(paths, { xoffSet, xoffSetMax, yoffSetMax }, floor);
  const getCord = (x, y) => {
    return grid[`${x}_${y}`];
  };
  let numberOfSand = 0;
  while (true) {
    let sandCord = [500, 0];
    let [x, y] = sandCord;
    while (getCord(x, y + 1)) {
      grid[`${x}_${y}`] = ".";
      if (getCord(x, y + 1) === ".") {
        y = y + 1;
      } else if (!"o#".includes(getCord(x - 1, y + 1))) {
        x = x - 1;
        y = y + 1;
      } else if (!"o#".includes(getCord(x + 1, y + 1))) {
        x = x + 1;
        y = y + 1;
      } else {
        grid[`${x}_${y}`] = "o";
        if (floor && x === 500 && y === 0) {
          printMap(grid, { xoffSet, xoffSetMax, yoffSetMax });
          return ++numberOfSand;
        }
        break;
      }
      if (!getCord(x, y + 1)) {
        printMap(grid, { xoffSet, xoffSetMax, yoffSetMax });
        return numberOfSand;
      }
    }
    numberOfSand++;
  }
}
const paths = inputs.map((path) => parsePath(path));

const sand = simulate(paths);
console.log("numberOfSand", sand);

const sand2 = simulate(paths, true);
console.log("numberOfSand part 2", sand2);
