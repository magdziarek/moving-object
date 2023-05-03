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
  if (com === 1) {
    stepForward(pos);
  } else if (com === 2) {
    stepBackwards(pos);
  } else {
    rotate(pos, com);
  }
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
function rotate(pos, com) {
  return;
}

module.exports = { formatStdin, move, stepForward, stepBackwards, rotate };
