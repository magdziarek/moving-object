const readline = require('readline');

console.log(
  `Enter commands: 
  0 to quit, 
  1 to move forward, 
  2 to move backwards, 
  3 to turn clockwise, 
  4 to turn anticlockwise`
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const start = [];
const tableSize = [];
try {
  const args = formatStdin(process.argv[2]);
  start.push(args[0], args[1], 'N');
  tableSize.push(args[2], args[3]);
} catch (err) {
  console.log(err);
}

rl.on('line', (line) => {
  processStdin(line);
});

function processStdin(line) {
  let result;
  try {
    const commands = formatStdin(line);
    if (isEveryCommandCorrect(commands)) {
      result = findFinalPosition(start, commands, tableSize);
    } else {
      console.log('Wrong command');
    }
    console.log('Final position:');
    process.stdout.write(`[${result}]\n`);
  } catch {
    console.log('Final position (not on the board):');
    process.stdout.write(`[-1, -1]\n`);
  } finally {
    process.exit();
  }
}

function formatStdin(input) {
  return input
    .trim()
    .split(',')
    .map(Number)
    .filter((i) => !isNaN(i));
}

function isEveryCommandCorrect(commands) {
  return commands.every((i) => i <= 4 && i >= 0);
}

function findFinalPosition(start, commands, limit) {
  try {
    let pos = start;
    for (let com of commands) {
      if (com === 0) {
        return pos.slice(0, 2);
      } else {
        pos = move(pos, com, limit);
      }
    }
    return pos.slice(0, 2);
  } catch (err) {
    throw err;
  }
}

function move(pos, com, limit) {
  try {
    switch (com) {
      case 1:
        pos = stepForward(pos, limit);
        break;
      case 2:
        pos = stepBackwards(pos, limit);
        break;
      case 3:
        pos = rotateClockwise(pos);
        break;
      case 4:
        pos = rotateAntiClockwise(pos);
        break;
      default:
        break;
    }
  } catch (err) {
    throw err;
  }
  return pos;
}

const throwError = () => {
  throw 'Off the limit!';
};

const increase = (val, limit) => (val < limit - 1 ? ++val : throwError());
const decrease = (val) => (val > 0 ? --val : throwError());

function stepForward(pos, limit) {
  let [x, y, z] = pos;
  const [maxX, maxY] = limit;
  try {
    switch (z) {
      case 'N':
        y = decrease(y);
        break;
      case 'S':
        y = increase(y, maxY);
        break;
      case 'W':
        x = decrease(x);
        break;
      case 'E':
        x = increase(x, maxX);
        break;
      default:
    }
  } catch (err) {
    throw err;
  }
  return [x, y, z];
}

function stepBackwards(pos, limit) {
  let [x, y, z] = pos;
  const [maxX, maxY] = limit;
  switch (z) {
    case 'N':
      y = increase(y, maxY);
      break;
    case 'S':
      y = decrease(y);
      break;
    case 'W':
      x = increase(x, maxX);
      break;
    case 'E':
      x = decrease(x);
      break;
    default:
  }
  return [x, y, z];
}
function rotateClockwise(pos) {
  let [x, y, z] = pos;
  const directions = ['E', 'S', 'W', 'N'];
  let i = directions.indexOf(z);
  i = i !== 3 ? ++i : 0;
  return [x, y, directions[i]];
}

function rotateAntiClockwise(pos) {
  let [x, y, z] = pos;
  const directions = ['E', 'S', 'W', 'N'];
  let i = directions.indexOf(z);
  i = i !== 0 ? --i : 3;
  return [x, y, directions[i]];
}

module.exports = {
  formatStdin,
  move,
  stepForward,
  stepBackwards,
  rotateClockwise,
  rotateAntiClockwise,
  findFinalPosition,
  isEveryCommandCorrect,
};
