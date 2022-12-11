const { syncReadFile } = require("../readFiles");

const sampleInputs = syncReadFile("./js/day10/sampleInput.txt");
const inputs = syncReadFile("./js/day10/input.txt");

console.log(sampleInputs);

function parseCommand(command) {
  const [action, value] = command.split(" ");
  return { action, value: value ? parseInt(value) : "" };
}

function getSignalStrength(inputs) {
  let cycleCounter = 1;
  let executionCounter = 1;
  let operationStack = [];
  let x = 1;
  let signalStrengths = [];
  let command = "";
  while (true) {
    if ((cycleCounter - 20) % 40 === 0) {
      const signalStrength = x * cycleCounter;
      signalStrengths.push(signalStrength);
      console.log(`at the ${cycleCounter}th cycle`, {
        x,
        operationStack,
        cycleCounter,
        signalStrengths,
      });
    }
    if (!command) {
      command = inputs.shift();
      if (!command) {
        break;
      }
    }
    const { action, value } = parseCommand(command);
    if (action === "noop") {
      command = "";
    } else if (action === "addx") {
      if (executionCounter === 0) {
        x += value;
        command = "";
        executionCounter = 1;
      } else {
        executionCounter--;
      }
    }

    cycleCounter++;
  }
  return { x, signalStrengths };
}

let { x, signalStrengths } = getSignalStrength(inputs);
console.log(x);

console.log(signalStrengths.reduce((acc, curr) => acc + curr, 0));

function renderCRTImage(inputs) {
  const numberOfPixels = 3;
  let spritePosition = new Array(numberOfPixels).fill(0).map((_, i) => i);
  let cycleCounter = 1;
  let executionCounter = 1;
  let x = 1;
  let crtImage = "";
  let crtImages = [];
  let command = "";
  while (true) {
    if (crtImage.length === 40) {
      crtImages.push(crtImage);
      crtImage = "";
    }

    if (!command) {
      command = inputs.shift();
      if (!command) {
        break;
      }
    }
    if (spritePosition.includes(cycleCounter % 40)) {
      crtImage = crtImage.concat("#");
    } else {
      crtImage = crtImage.concat(".");
    }

    const { action, value } = parseCommand(command);
    if (action === "noop") {
      command = "";
    } else if (action === "addx") {
      if (executionCounter === 0) {
        x += value;
        command = "";
        executionCounter = 1;
        spritePosition = new Array(numberOfPixels).fill(0).map((_, i) => i + x);
      } else {
        executionCounter--;
      }
    }
    cycleCounter++;
  }
  return { x, crtImages };
}

const { crtImages } = renderCRTImage(inputs);

crtImages.forEach((row) => {
  console.log(row);
});
