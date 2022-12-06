const { syncReadFile } = require("../readFiles");

const [input, _] = syncReadFile("day6/input.txt");

const findFirstMessageMarker = (input, numOfDist = 4) => {
  let currentIndex = 0;
  let found = false;
  while (!found) {
    const subString = [
      ...new Set(input.substring(currentIndex, currentIndex + numOfDist)),
    ];
    const isUnique = subString.length === numOfDist;
    currentIndex = isUnique ? currentIndex + numOfDist : currentIndex + 1;
    found = isUnique;
  }
  return currentIndex;
};

console.log(" === part 1 ===");
let start = Date.now();
const firstMarker = findFirstMessageMarker(input);
console.log("answer: ", firstMarker);
console.log("completed in:", Date.now() - start, "ms");


console.log(" === part 2 ===");
start = Date.now();
const firstMarker2 = findFirstMessageMarker(input, 14);
console.log("answer :", firstMarker2);
console.log("completed in:", Date.now() - start, "ms");
