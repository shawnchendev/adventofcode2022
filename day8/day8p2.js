const { syncReadFile } = require("../readFiles");

// const sampleInput = syncReadFile("day8/sampleInput.txt");
const sampleInput = syncReadFile("day8/input.txt");
console.log(sampleInput);
let total = [];
for (let i = 1; i < sampleInput.length - 2; i++) {
  const input = sampleInput[i];
  if (!input) continue;
  for (let j = 1; j < input.length - 1; j++) {
    const center = sampleInput[i][j];
    console.log(i, j, "Current", center);
    const topVisible = searchTop(center, { x: j, y: i }, sampleInput, 0);
    const bottomVisible = searchBottom(center, { x: j, y: i }, sampleInput, 0);
    const rightVisible = searchRight(center, { x: j, y: i }, sampleInput, 0);
    const leftVisible = searchLeft(center, { x: j, y: i }, sampleInput, 0);
    const scenicScore = topVisible * bottomVisible * rightVisible * leftVisible;
    console.log(
      topVisible,
      "*",
      leftVisible,
      "*",
      rightVisible,
      "*",
      bottomVisible
    );

    console.log("Scenic Score", scenicScore);
    total.push(scenicScore);
    console.log("");
  }
}
console.log(total);

function searchTop(currentValue, currentPosition, map, isVisible = 0) {
  const { x, y } = currentPosition;
  const top = map[y - 1]?.[x];
  if (!top) return isVisible;
  if (top < currentValue) {
    isVisible++;
    return searchTop(currentValue, { x, y: y - 1 }, map, isVisible);
  }
  return (isVisible += 1);
}

function searchBottom(currentValue, currentPosition, map, isVisible = 0) {
  const { x, y } = currentPosition;
  const bottom = map[y + 1]?.[x];
  if (!bottom) return isVisible;
  if (bottom < currentValue) {
    isVisible++;
    return searchBottom(currentValue, { x, y: y + 1 }, map, isVisible);
  }
  return (isVisible += 1);
}

function searchLeft(currentValue, currentPosition, map, isVisible = 0) {
  const { x, y } = currentPosition;
  const left = map[y]?.[x - 1];
  if (!left) return isVisible;
  if (left < currentValue) {
    isVisible++;
    return searchLeft(currentValue, { x: x - 1, y }, map, isVisible);
  }
  return (isVisible += 1);
}

function searchRight(currentValue, currentPosition, map, isVisible = 0) {
  const { x, y } = currentPosition;
  const right = map[y]?.[x + 1];
  if (!right) return isVisible;
  if (right < currentValue) {
    isVisible++;
    return searchRight(currentValue, { x: x + 1, y }, map, isVisible);
  }

  return (isVisible += 1);
}

const highestScenicScore = total.sort((a, b) => b - a)[0];
console.log("highest Scenic Score", highestScenicScore);
