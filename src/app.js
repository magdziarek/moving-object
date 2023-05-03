const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tableSize = [process.argv[2], process.argv[3]];
// at the start always face north
const start = [process.argv[4], process.argv[5], 'N'];

rl.on('line', (line) => {
  let result;
  try {
    const commands = formatStdin(line);
    result = commands.reduce((position, command) => {
      if (command === 0) {
        process.exit();
      }
      position = move(position, command);
    }, start);
    rl.on('close', () => {
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
});

function formatStdin(input) {
  try {
    return input
      .trim()
      .split(',')
      .map(Number)
      .filter((i) => i <= 4 && i >= 0);
  } catch (err) {
    throw `Wrong input: ${err}`;
  }
}

function move(pos, com, size) {
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
};
