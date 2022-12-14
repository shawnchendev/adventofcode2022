const { syncReadFile } = require("../readFiles");
const { Tree } = require("./tree");

const inputs = syncReadFile("day7/input.txt");
const sampleInput = syncReadFile("day7/sampleInput.txt");

console.log(inputs);
console.log(sampleInput);

const parseCommand = (input) => {
  if (input === "") return;
  console.log("input: ", input);
  const command = input.split(" ");
  if (command[0] === "$") {
    return {
      action: command[1],
      dir: command[2] || null,
    };
  }
  if (command[0] === "dir") {
    return {
      action: null,
      name: command[1],
    };
  }
  return {
    action: null,
    size: Number(command[0]),
    fileName: command[1],
  };
};

const buildTree = (input) => {
  let dirs = null;
  let currentNode = null;
  input.forEach((input) => {
    const command = parseCommand(input);
    if (!command) return;
    if (command.action === "ls") return;
    if (command.action === "cd" && command.dir !== "..") {
      if (!dirs) {
        dirs = new Tree(command.dir);
        currentNode = dirs.root;
      } else {
        currentNode = currentNode.nodes.find(
          (node) => node.name === command.dir
        );
      }
      return;
    }

    if (command.action === "cd" && command.dir === "..") {
      currentNode = currentNode.parent;
      return;
    }
    if (!command.action && command.name) {
      currentNode.addNode(command.name);
      return;
    }
    if (!command.action && command.fileName) {
      const file = { name: command.fileName, size: command.size };
      currentNode.addFile(file);
      return;
    }
  });
  return dirs;
};

function sumFiles(root) {
  let total = 0;
  const files = Object.keys(root.files);

  // Sum up the sizes of all the files in the current directory
  for (const file of files) {
    total += root.files[file];
  }
  // Recurse into each subdirectory
  for (const node of root.nodes) {
    total += sumFiles(node);
  }
  return total;
}

function sumAllDirectorySizes(root) {
  let total = [];
  const bfsSum = (node) => {
    total.push(sumFiles(node));
    if (!node.nodes) return;

    for (const n of node.nodes) {
      bfsSum(n, total);
    }
  };
  bfsSum(root);
  return total;
}

function sumDirectoriesLess100K(total) {
  return total.reduce((acc, key) => {
    if (key <= 100000) {
      acc += key;
    }
    return acc;
  }, 0);
}

const dirs = buildTree(inputs);
const directorySizes = sumAllDirectorySizes(dirs.root);
const finalSum = sumDirectoriesLess100K(directorySizes);

console.log("part 1: ", finalSum);

const rootSize = directorySizes[0];
const freeSpace = 70000000 - rootSize;
const spaceNeeded = 30000000 - freeSpace;
console.log(freeSpace, "free space");
console.log(spaceNeeded, " space needed");

const smallestDirectory = directorySizes
  .filter((key) => key >= spaceNeeded)
  .sort((a, b) => a - b);

console.log("part 2", smallestDirectory[0]);
