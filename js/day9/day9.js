const { syncReadFile } = require("../readFiles");

const sampleInputs = syncReadFile("./js/day9/sampleInput.txt");
const inputs = syncReadFile("./js/day9/input.txt");
console.log(sampleInputs);
console.log(inputs);

const start = { x: 0, y: 0 };

function move(start, direction, value = 1) {
  const { x, y } = { ...start };
  switch (direction) {
    case "R": {
      return { x: x + value, y };
    }
    case "U": {
      return { x, y: y + value };
    }
    case "L": {
      return { x: x - value, y };
    }
    case "D": {
      return { x, y: y - value };
    }
    default: {
      return start;
    }
  }
}

function parseCommand(command) {
  const [direction, value] = command.split(" ");
  return { direction, value: parseInt(value) };
}

function getDifferent(head, tail) {
  const { x: hx, y: hy } = head;
  const { x: tx, y: ty } = tail;

  return { xDelta: Math.abs(hx - tx), yDelta: Math.abs(hy - ty) };
}

let head = { ...start };
let tail = { ...start };
let visitedSpot = new Set();
sampleInputs.forEach((command) => {
  if (!command) return;
  const { direction, value } = parseCommand(command);
  for (let i = 0; i < value; i++) {
    head = move(head, direction);
    const getDifferentResult = getDifferent(head, tail);
    const { xDelta, yDelta } = getDifferentResult;
    console.log(head, tail, getDifferentResult);
    if (xDelta >= 1 && yDelta >= 1) {
      tail = { x: tail.x + 1, y: tail.y + 1 };
      visitedSpot.add(`${tail.x},${tail.y}`);
      continue;
    }
    if (xDelta >= 1 && yDelta === 0) {
      tail = { x: tail.x + 1, y: tail.y };
      visitedSpot.add(`${tail.x},${tail.y}`);
      continue;
    }
    if (xDelta === 0 && yDelta >= 1) {
      tail = { x: tail.x, y: tail.y + 1 };
      visitedSpot.add(`${tail.x},${tail.y}`);
      continue;
    }
  }
  console.log(visitedSpot);
});

console.log([...visitedSpot].length);
