const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const start = [];
const tableSize = [];
try {
  const args = formatStdin(process.argv[2], true);
  tableSize.push(args[0], args[1]);
  // at the start always face north
  start.push(args[2], args[3], 'N');
} catch (err) {
  console.log(err);
}

rl.on('line', (line) => {
  let result;
  try {
    const commands = formatStdin(line);
    if (isEveryCommandCorrect(commands)) {
      result = findFinalPosition(commands, start);
    }
    rl.on('close', () => {
      console.log(result);
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit();
  }
});

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

function findFinalPosition(commands, start) {
  return commands.reduce((position, command) => {
    console.log('position', position);
    if (command === 0) {
      return position;
    }
    position = move(position, command);
    return position;
  }, start);
}

function move(pos, com) {
  switch (com) {
    case 1:
      pos = stepForward(pos);
      break;
    case 2:
      pos = stepBackwards(pos);
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
  return pos;
}

function stepForward(pos) {
  let [x, y, z] = pos;
  switch (z) {
    case 'N':
      y--;
      break;
    case 'S':
      y++;
      break;
    case 'W':
      x--;
      break;
    case 'E':
      x++;
      break;
    default:
  }
  return [x, y, z];
}

function stepBackwards(pos) {
  let [x, y, z] = pos;
  switch (z) {
    case 'N':
      y++;
      break;
    case 'S':
      y--;
      break;
    case 'W':
      x++;
      break;
    case 'E':
      x--;
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
};
