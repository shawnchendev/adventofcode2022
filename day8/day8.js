const { syncReadFile } = require("../readFiles");

// const sampleInput = syncReadFile("day8/sampleInput.txt");
const sampleInput = syncReadFile("day8/input.txt");
console.log(sampleInput);

const outerGrid = (sampleInput[0].length - 1 + (sampleInput.length - 2)) * 2;
console.log(outerGrid);
let total = 0;
for (let i = 1; i < sampleInput.length - 2; i++) {
  const input = sampleInput[i];
  if (!input) continue;
  for (let j = 1; j < input.length - 1; j++) {
    const center = sampleInput[i][j];
    console.log(i, j);
    const topVisible = searchTop(center, { x: j, y: i }, sampleInput);
    const bottomVisible = searchBottom(center, { x: j, y: i }, sampleInput);
    const rightVisible = searchRight(center, { x: j, y: i }, sampleInput);
    const leftVisible = searchLeft(center, { x: j, y: i }, sampleInput);
    console.log(
      topVisible || bottomVisible || rightVisible || leftVisible
        ? "Visible"
        : "Not Visible"
    );
    if (topVisible || bottomVisible || rightVisible || leftVisible) {
      total++;
    }
    console.log("");
  }
}
console.log(total);

function searchTop(currentValue, currentPosition, map, isVisible = false) {
  const { x, y } = currentPosition;
  const top = map[y - 1]?.[x];
  if (!top) return isVisible;
  if (top < currentValue) {
    isVisible = true;
    return searchTop(currentValue, { x, y: y - 1 }, map, isVisible);
  }
  return false;
}

function searchBottom(currentValue, currentPosition, map, isVisible = false) {
  const { x, y } = currentPosition;
  const bottom = map[y + 1]?.[x];
  if (!bottom) return isVisible;
  if (bottom < currentValue) {
    isVisible = true;
    return searchBottom(currentValue, { x, y: y + 1 }, map, isVisible);
  }
  return false;
}

function searchLeft(currentValue, currentPosition, map, isVisible = false) {
  const { x, y } = currentPosition;
  const left = map[y]?.[x - 1];
  if (!left) return isVisible;
  if (left < currentValue) {
    isVisible = true;
    return searchLeft(currentValue, { x: x - 1, y }, map, isVisible);
  }
  return false;
}

function searchRight(currentValue, currentPosition, map, isVisible = false) {
  const { x, y } = currentPosition;
  const right = map[y]?.[x + 1];
  if (!right) return isVisible;
  if (right < currentValue) {
    isVisible = true;
    return searchRight(currentValue, { x: x + 1, y }, map, isVisible);
  }
  return false;
}

const totalVisibleTree = outerGrid + total;
console.log(totalVisibleTree);
