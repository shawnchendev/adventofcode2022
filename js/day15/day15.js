const inputs = require("../readFiles")
  .syncReadFile("./js/day15/sample.txt")
  .filter((line) => line);

const parseInputs = (inputs) => {
  const pattern =
    /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;
  return inputs.map((input) => {
    const match = pattern.exec(input);
    return {
      sensor: {
        x: parseInt(match[1]),
        y: parseInt(match[2]),
      },
      beacon: {
        x: parseInt(match[3]),
        y: parseInt(match[4]),
      },
    };
  });
};

const manhattanDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const findMinMaxX = (inputs) => {
  const xs = inputs.map(
    ({ sensor, beacon }) => sensor.x - manhattanDistance(sensor, beacon)
  );
  const xss = inputs
    .map(({ sensor, beacon }) => sensor.x + manhattanDistance(sensor, beacon))
    .reduce((a, b) => (b > a ? b : a));
  return {
    min: Math.min(...xs),
    max: xss,
  };
};

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};
const main = (inputs, y = 10) => {
  const parsedInputs = parseInputs(inputs);
  const { min, max } = findMinMaxX(parsedInputs);
  let count = range(min, max).filter((x) => {
    return parsedInputs.some(({ sensor, beacon }) => {
      const currentRowDistance = manhattanDistance(sensor, { x, y });
      const beaconDistance = manhattanDistance(sensor, beacon);
      return (
        currentRowDistance <= beaconDistance &&
        !(x === beacon.x && y === beacon.y)
      );
    });
  }).length;
  console.log(count);
};

main(inputs);

const mainPart2 = (inputs, signal = 4000000) => {
  const parsedInputs = parseInputs(inputs);
  for (let y = 0; y < signal; y++) {
    for (let x = 0; x < signal; x++) {
      if (
        parsedInputs.every(({ sensor, beacon }) => {
          const sensorToBeacon = manhattanDistance(sensor, beacon);
          const sensorToCurrent = manhattanDistance(sensor, { x, y });
          if (sensorToCurrent > sensorToBeacon) return true;
          const yDistance = Math.abs(sensor.y - y);
          x = sensor.x + (sensorToBeacon - yDistance);
          return false;
        })
      ) {
        console.log(x * signal + y);
        break;
      }
    }
  }
};

mainPart2(inputs);
