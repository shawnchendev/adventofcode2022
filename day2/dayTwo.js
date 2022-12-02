const { syncReadFile } = require("../readFiles");

const SCORES = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
};
const WIN = 6;
const LOST = 0;
const DRAW = 3;

//part 1 rules
const rules = {
  Z: {
    s: 3,
    A: LOST,
    B: WIN,
    C: DRAW,
  },
  Y: {
    s: 2,
    A: WIN,
    B: DRAW,
    C: LOST,
  },
  X: {
    s: 1,
    A: DRAW,
    B: LOST,
    C: WIN,
  },
};

function findTotalScore(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    const [player1, player2] = data[i].split(" ");
    if (!player1 || !player2) continue;
    total = total + rules[player2][player1] + rules[player2].s;
  }
  return total;
}

//part 2
const strategy = {
  X: {
    p: LOST,
    placement: {
      A: "Z",
      B: "X",
      C: "Y",
    },
  },
  Y: { p: DRAW, placement: { A: "X", B: "Y", C: "Z" } },
  Z: {
    p: WIN,
    placement: {
      A: "Y",
      B: "Z",
      C: "X",
    },
  },
};

function findTotalBaseOnStrategy(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    const [player1, player2] = data[i].split(" ");
    if (!player1 || !player2) continue;
    total =
      total +
      strategy[player2].p +
      SCORES[strategy[player2].placement[player1]];
  }
  return total;
}

const data = syncReadFile("./dayTwoInput.txt");
const totalScore = findTotalScore(data);
console.log("Part1", totalScore);
const total = findTotalBaseOnStrategy(data);
console.log("Part2", total);
