const { syncReadFile } = require("../readFiles");

function sumElvesCalories(array) {
  let temp = 0;
  return array
    .reduce((total, i) => {
      if (i === "") {
        total.push(temp);
        temp = 0;
        return total;
      }
      temp += Number(i);
      return total;
    }, [])
    .sort((a, b) => a - b);
}

function findTopXSum(totalArray, number) {
  return totalArray.slice(-1 * number).reduce((a, b) => a + b);
}

const data = syncReadFile("day1/input.txt");
const total = sumElvesCalories(data);
const top1Sum = findTopXSum(total, 1);
const top3Sum = findTopXSum(total, 3);

console.log("total", total);
console.log("top1Sum", top1Sum);
console.log("top3Sum", top3Sum);
