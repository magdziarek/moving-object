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
    result = commands.reduce(
      (position, command) => (position = move(position, command, size)),
      start
    );
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
    return input.trim().split(',').map(Number).filter(Boolean);
  } catch (err) {
    throw `Wrong input: ${err}`;
  }
}

function move() {}
module.exports = { move, formatStdin };
