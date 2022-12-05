const { syncReadFile } = require("../readFiles");

const input = syncReadFile("day5/input.txt");

const sampleInput = syncReadFile("day5/sampleInput.txt");
console.log(sampleInput);

const getStackInput = (input) => {
  const stackInput = [];
  let emptyStringIndex = 0;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (curr === "") {
      emptyStringIndex = i;
      break;
    }
    stackInput.push(curr);
  }
  const actionInput = input.slice(emptyStringIndex + 1);
  return {
    stackInput,
    actions: actionInput.parseMoves(),
  };
};

/**
 *
 *'        [C] [B] [H]',
  '[W]     [D] [J] [Q] [B]',
  '[P] [F] [Z] [F] [B] [L]',
  '[G] [Z] [N] [P] [J] [S] [V]',
  '[Z] [C] [H] [Z] [G] [T] [Z]     [C]',
  '[V] [B] [M] [M] [C] [Q] [C] [G] [H]',
  '[S] [V] [L] [D] [F] [F] [G] [L] [F]',
  '[B] [J] [V] [L] [V] [G] [L] [N] [J]',
  ' 1   2   3   4   5   6   7   8   9'
 */
parseStacks = (stackInput) => {
  const reverseInput = [...stackInput].reverse();
  let stacks = {};
  for (let i = 1; i < reverseInput.length; i++) {
    const line = reverseInput[i];
    for (let j = 0; j < line.length; j = j + 4) {
      if (line[j] !== "[") continue;
      const stackIndex = j / 4 + 1;
      const crate = line.substring(j + 1, j + 2);
      if (!stacks[stackIndex]) stacks[stackIndex] = [];
      stacks[stackIndex].push(crate);
    }
  }
  return stacks;
};

Array.prototype.parseMoves = function () {
  const moves = [];
  for (let i = 0; i < this.length; i++) {
    const line = this[i];
    if (line === "") continue;
    const move = line.split(" ");
    moves.push({
      count: move[1],
      from: move[3],
      to: move[5],
    });
  }
  return moves;
};

const moveCrates = (stacks, moves, fifo = true) => {
  const tempStacks = { ...stacks };
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const { count, from, to } = move;
    const crates = tempStacks[from].splice(-1 * count);
    tempStacks[to].push(...(fifo ? crates.reverse() : crates));
  }
  return tempStacks;
};
const getTopCrateInMessages = (stacks) => {
  return Object.values(stacks)
    .map((stack) => {
      return stack[stack.length - 1];
    })
    .join("");
};
const { stackInput, actions } = getStackInput(input);
const stacks = parseStacks(stackInput);

const finalStacks = moveCrates(stacks, actions);
const topCrates = getTopCrateInMessages(finalStacks);
console.log("part1:", topCrates);

const stacks2 = parseStacks(stackInput);
const finalStacks2 = moveCrates(stacks2, actions, false);
const topCrates2 = getTopCrateInMessages(finalStacks2);
console.log("part 2:", topCrates2);
