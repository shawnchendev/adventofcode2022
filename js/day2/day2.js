const { syncReadFile } = require("../readFiles");

const SCORES = {
  X: 1,
  Y: 2,
  Z: 3,
};
const WIN = 6;
const LOST = 0;
const DRAW = 3;

const part1Rules = {
  "A X": DRAW + SCORES["X"],
  "A Y": WIN + SCORES["Y"],
  "A Z": LOST + SCORES["Z"],

  "B X": LOST + SCORES["X"],
  "B Y": DRAW + SCORES["Y"],
  "B Z": WIN + SCORES["Z"],

  "C X": WIN + SCORES["X"],
  "C Y": LOST + SCORES["Y"],
  "C Z": DRAW + SCORES["Z"],
};

function calculateTotal(input, rules) {
  return input.reduce((acc, curr) => {
    if (curr) {
      return acc + rules[curr];
    }
    return acc;
  }, 0);
}

const part2Rules = {
  "A X": LOST + SCORES["Z"],
  "B X": LOST + SCORES["X"],
  "C X": LOST + SCORES["Y"],

  "A Y": DRAW + SCORES["X"],
  "B Y": DRAW + SCORES["Y"],
  "C Y": DRAW + SCORES["Z"],

  "A Z": WIN + SCORES["Y"],
  "B Z": WIN + SCORES["Z"],
  "C Z": WIN + SCORES["X"],
};

const input = syncReadFile("day2/input.txt");

const totalPart1 = calculateTotal(input, part1Rules);
const totalPart2 = calculateTotal(input, part2Rules);
console.log("Part1: ", totalPart1);
console.log("Part2: ", totalPart2);
