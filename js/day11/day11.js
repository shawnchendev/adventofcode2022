const { syncReadFile } = require("../readFiles");

const sampleInputs = syncReadFile("./js/day11/sampleInput.txt");
const inputs = syncReadFile("./js/day11/input.txt");
const inputs2 = syncReadFile("./js/day11/input.txt");

console.log(sampleInputs);
console.log(inputs);

function parseOperation(operation, currentItemValue) {
  const operationChar = operation.split(" ");
  let operationValue = 0;
  if (operationChar[operationChar.length - 1] === "old") {
    operationValue = currentItemValue;
  } else {
    operationValue = parseInt(operationChar.pop());
  }
  if (operationChar.includes("+")) {
    const worryLevel = currentItemValue + operationValue;
    // console.log(
    //   `Worry level is increased by ${operationValue} to ${worryLevel}.`
    // );
    return worryLevel;
  }
  if (operationChar.includes("-")) {
    const worryLevel = currentItemValue - operationValue;
    // console.log(
    //   `Worry level is decreased by ${operationValue} to ${worryLevel}.`
    // );
    return worryLevel;
  }
  if (operationChar.includes("*")) {
    const worryLevel = currentItemValue * operationValue;
    // console.log(
    //   `Worry level is multiplied by ${operationValue} to ${worryLevel}.`
    // );
    return worryLevel;
  }
  if (operationChar.includes("/")) {
    const worryLevel = currentItemValue / operationValue;
    return worryLevel;
    // console.log(
    //   `Worry level is divided by ${operationValue} to ${worryLevel}.`
    // );
  }
}

function parseInput(inputs) {
  let monkeys = {};
  while (inputs.length) {
    const input = inputs.shift();
    const [action, value] = input.split(" ");
    if (action === "Monkey") {
      const monkeyStat = inputs.slice(0, 6);
      const startItems = monkeyStat[0]
        .split(":")[1]
        .split(",")
        .map((item) => parseInt(item));
      const operation = monkeyStat[1].split(": ")[1];
      const test = monkeyStat[2].split(":")[1].split(" ");
      const divisible = parseInt(test.pop());
      const trueCase = parseInt(monkeyStat[3].split(" ").pop());
      const falseCase = parseInt(monkeyStat[4].split(" ").pop());
      const monkey = {
        startItems,
        operation,
        divisible,
        trueCase,
        falseCase,
        tempStack: [],
      };
      monkeys[parseInt(value[0])] = monkey;
    }
  }
  return monkeys;
}

function monkeyWorrySimulator(
  monkeys,
  worryCalculator = (worryLevel) => Math.floor(worryLevel / 3),
  numberOfRound = 20
) {
  const monkeyInspection = {};
  let i = 0;

  while (true) {
    Object.keys(monkeys).forEach((key) => {
      console.log(`Monkey ${key} is inspecting their items.`);
      let inspectionTime = 0;
      const { startItems, operation, divisible, trueCase, falseCase } =
        monkeys[key];
      if (!startItems.length) return;
      while (true) {
        let currentItemValue = startItems.shift();
        // console.log(
        //   `Monkey inspects an item with a worry level of ${currentItemValue}.`
        // );
        let worryLevel = parseOperation(operation, currentItemValue);
        worryLevel = worryCalculator(worryLevel);
        // console.log(
        //   `Monkey gets bored with item. Worry level is ${worryLevel}.`
        // );
        if (worryLevel % divisible === 0) {
          // console.log(`Current worry level is divisible by ${divisible}`);
          // console.log(
          //   ` Item with worry level ${worryLevel} is thrown to monkey ${trueCase}.`
          // );
          monkeys[trueCase].startItems.push(worryLevel);
        } else {
          // console.log(`Current worry level is not divisible by ${divisible}`);
          // console.log(
          //   ` Item with worry level ${worryLevel} is thrown to monkey ${falseCase}.`
          // );
          monkeys[falseCase].startItems.push(worryLevel);
        }
        inspectionTime++;
        if (!startItems.length) {
          if (!monkeyInspection[key]) {
            monkeyInspection[key] = 0;
          }
          monkeyInspection[key] = monkeyInspection[key] + inspectionTime;
          break;
        }
      }
    });
    i++;
    if (i === numberOfRound) {
      break;
    }
  }
  return monkeyInspection;
}

const monkeys = parseInput(sampleInputs);
const monkeyInspection = monkeyWorrySimulator(monkeys);

console.log(monkeys);
const sorted = Object.values(monkeyInspection).sort((a, b) => b - a);
console.log(sorted[0] * sorted[1]);

const monkeys2 = parseInput(inputs2);
const commonDivisor = Object.keys(monkeys2).reduce((acc, key) => {
  return acc * monkeys2[key].divisible;
}, 1);

const monkeyInspection2 = monkeyWorrySimulator(
  monkeys2,
  (worryLevel) => worryLevel % commonDivisor,
  10000
);
const sorted2 = Object.values(monkeyInspection2).sort((a, b) => b - a);
console.log(sorted2[0] * sorted2[1]);
