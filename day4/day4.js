const { syncReadFile } = require("../readFiles.js");

const input = syncReadFile("day4/input.txt");

const sampleInput = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

function range([start, end], step = 1) {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
}

function parseInput(input) {
  if (!input) {
    return;
  }
  const [first, second] = input.split(",");
  const [firstPairOne, firstPairTwo] = first.split("-");
  const [secondPairOne, secondPairTwo] = second.split("-");

  return {
    firstPair: [Number(firstPairOne), Number(firstPairTwo)],
    secondPair: [Number(secondPairOne), Number(secondPairTwo)],
  };
}

function isPairsFullyContained(pairs) {
  const { firstPair, secondPair } = pairs;

  const firstPairRange = range(firstPair);
  const secondPairRange = range(secondPair);

  const isFirstPairContained = secondPairRange.every((i) =>
    firstPairRange.includes(i)
  );

  const isSecondPairContained = firstPairRange.every((i) =>
    secondPairRange.includes(i)
  );
  return isFirstPairContained || isSecondPairContained;
}

const isSomeElementIncluded = (arr1, arr2) =>
  arr1.some((i) => arr2.includes(i));

function isPairOverlap(pairs) {
  const { firstPair, secondPair } = pairs;
  const firstPairRange = range(firstPair);
  const secondPairRange = range(secondPair);
  const isFirstPairOverlap = isSomeElementIncluded(
    secondPairRange,
    firstPairRange
  );

  const isSecondPairOverlap = isSomeElementIncluded(
    firstPairRange,
    secondPairRange
  );

  return isFirstPairOverlap || isSecondPairOverlap;
}

const start = new Date().getTime();
console.log("start:", start);
const part1Output = input.map(parseInput).filter((item) => item);
const numberOfPairsContained = part1Output
  .map(isPairsFullyContained)
  .filter((isPair) => isPair).length;
console.log({ numberOfPairsContained });
console.log("part 1 end:", new Date().getTime() - start, "ms");

const startPart2 = new Date().getTime();
console.log("start Part 2:", startPart2);

const part2Output = input.map(parseInput).filter((item) => item);

const numberOfPairsOverlap = part2Output
  .map(isPairOverlap)
  .filter((isPair) => isPair).length;

console.log({ numberOfPairsOverlap });
console.log("part 2 end:", new Date().getTime() - startPart2, "ms");
