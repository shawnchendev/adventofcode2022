const { syncReadFile } = require("../readFiles");

const sampleInputs = syncReadFile("./js/day9/sampleInput.txt");
const sampleInputsP2 = syncReadFile("./js/day9/sampleInputP2.txt");
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
  return { x: head.x - tail.x, y: head.y - tail.y };
}

function moveRope(ropeLength = 2) {
  let rope = new Array(ropeLength).fill({ ...start });
  let tailsVisitedSpot = new Set();
  inputs.forEach((command) => {
    if (!command) return;
    const { direction, value } = parseCommand(command);
    for (let i = 0; i < value; i++) {
      rope[0] = move(rope[0], direction);
      for (let j = 1; j < rope.length; j++) {
        let head = rope[j - 1];
        const different = getDifferent(head, rope[j]);
        if (different.y >= 2) {
          rope[j] = move(rope[j], "U");
          if (different.x >= 1) {
            rope[j] = move(rope[j], "R");
          } else if (different.x <= -1) {
            rope[j] = move(rope[j], "L");
          }
        } else if (different.y <= -2) {
          rope[j] = move(rope[j], "D");
          if (different.x >= 1) {
            rope[j] = move(rope[j], "R");
          } else if (different.x <= -1) {
            rope[j] = move(rope[j], "L");
          }
        } else if (different.x >= 2) {
          rope[j] = move(rope[j], "R");
          if (different.y >= 1) {
            rope[j] = move(rope[j], "U");
          } else if (different.y <= -1) {
            rope[j] = move(rope[j], "D");
          }
        } else if (different.x <= -2) {
          rope[j] = move(rope[j], "L");
          if (different.y >= 1) {
            rope[j] = move(rope[j], "U");
          } else if (different.y <= -1) {
            rope[j] = move(rope[j], "D");
          }
        }
      }
      tailsVisitedSpot.add(
        `${rope[rope.length - 1].x},${rope[rope.length - 1].y}`
      );
    }
  });
  return tailsVisitedSpot;
}

let tailsVisitedSpotP1 = moveRope(2);
let tailsVisitedSpotP2 = moveRope(10);

console.log("part 1", [...tailsVisitedSpotP1].length);
console.log("part 2", [...tailsVisitedSpotP2].length);
