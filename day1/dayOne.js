const { syncReadFile } = require("../readFiles");
const data = syncReadFile("./day1/dayOneInput.txt");

function sumElvesCalories(array) {
  const total = [];
  let temp = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "") {
      total.push(temp);
      temp = 0;
      continue;
    }
    temp = temp + parseInt(array[i]);
  }
  return total;
}

function findMax(totalArray) {
  const sorted = totalArray.sort((a, b) => a - b);
  return sorted[sorted.length - 1];
}

function findTopXSum(totalArray, number) {
  const sorted = totalArray.sort((a, b) => a - b);
  const topX = sorted.slice(-1 * number);
  return topX.reduce((a, b) => a + b);
}
const total = sumElvesCalories(data);
const max = findMax(total);
const top3Sum = findTopXSum(total, 3);
console.log("total", total);
console.log("max", max);
console.log("top3Sum", top3Sum);
