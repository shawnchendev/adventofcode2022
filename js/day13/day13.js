const input = require("fs")
  .readFileSync("./js/day13/input.txt", "utf-8")
  .split("\n\n");

const num = Number.isFinite;

const compare = (a, b) => {
  if (num(a) && num(b)) {
    if (a < b) return 1;
    if (a > b) return -1;
  } else if (num(a)) return compare([a], b);
  else if (num(b)) return compare(a, [b]);
  else {
    if (a === undefined) return 1;
    else if (b === undefined) return -1;

    let maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      let comp = compare(a[i], b[i]);
      if (comp !== 0) return comp;
    }
    if (a.length < b.length) return 1;
    if (a.length > b.length) return -1;
  }
  return 0;
};

let inOrder = 0;

input.forEach((packet, index) => {
  if (!packet) return;
  let pair = packet.split("\n");

  let packet1 = JSON.parse(pair[0]);
  let packet2 = JSON.parse(pair[1]);
  let maxLen = Math.max(packet1.length, packet2.length);
  if (maxLen < 1) {
    inOrder += index + 1;
  }

  for (let i = 0; i < maxLen; i++) {
    let a = packet1[i];
    let b = packet2[i];
    let comp = compare(a, b);
    if (comp > 0) {
      inOrder += index + 1;
    }
    if (comp !== 0) break;
    if (i === maxLen - 1) {
      inOrder += index + 1;
    }
  }
});

console.log(`Sum of indices of pairs in order: ${inOrder}`); // Part 1

const packets = input.flatMap((p) => p.split("\n")).concat(["[[2]]", "[[6]]"]);
let divider1 = 1;
let divider2 = 1;

for (let i = 0; i < packets.length; i++) {
  if (!packets[i]) continue;
  let packet = JSON.parse(packets[i]);
  let com2 = compare(packet, [[2]]);
  let com6 = compare(packet, [[6]]);
  if (com2 === 1) {
    divider1++;
  }
  if (com6 === 1) {
    divider2++;
  }
}
console.log(`Decoder key: ${divider1 * divider2}`);
