const { syncReadFile } = require("../readFiles");

const [input, _] = syncReadFile("day6/input.txt");

const isUnqiue = (chars) => {
  return [...new Set(chars)].length === chars.length;
};

const findFirstMessageMarker = (input, numOfDist = 4) => {
  let currentIndex = 0;
  let found = false;
  while (!found) {
    const subString = input.substring(currentIndex, currentIndex + numOfDist);
    let unique = isUnqiue(subString);
    currentIndex = unique ? currentIndex + numOfDist : currentIndex + 1;
    found = unique;
  }
  return currentIndex;
};

const firstMarker = findFirstMessageMarker(input);
const firstMarker2 = findFirstMessageMarker(input, 14);
console.log("part1:", firstMarker);
console.log("part2:", firstMarker2);
