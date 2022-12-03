const { syncReadFile } = require("../readFiles.js");

const input = syncReadFile("day3/input.txt");

const sampleInput = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

function splitRucksack(input) {
  let firstComp = input.slice(0, input.length / 2);
  let secComp = input.slice(input.length / 2);

  return [firstComp, secComp];
}

function matchString([a, b]) {
  const setA = new Set(a);
  const setB = new Set(b);
  const setC = [...setA].filter((x) => setB.has(x));
  return setC;
}

function groupThreeInput(input) {
  const group = [];
  for (let i = 0; i < input.length - 2; i += 3) {
    const subGroup = input.slice(i, i + 3);
    group.push(subGroup);
  }
  return group;
}

function getMatchLetterDecimalValue(matchedLetter) {
  return matchedLetter.charCodeAt(0) - 96 < 0
    ? matchedLetter.charCodeAt(0) - 38 // this mean the letter is capital
    : matchedLetter.charCodeAt(0) - 96; //else is a lower case letter
}

function findTotals(input, mapFunc) {
  return input
    .map((item) => {
      return mapFunc(item);
    })
    .filter((item) => item)
    .reduce((total, curr) => {
      return total + getMatchLetterDecimalValue(curr);
    }, 0);
}

let total = findTotals(input, (item) => {
  const compartments = splitRucksack(item);
  return matchString(compartments)[0];
});

console.log("partOneTotal", total);

let partTwoTotal = findTotals(groupThreeInput(input), (item) => {
  let tempMath = item[0];
  for (let i = 0; i < item.length; i++) {
    const a = matchString([tempMath, item[i]]);
    tempMath = a;
  }
  return tempMath[0];
});
console.log("partTwoTotal", partTwoTotal);
