const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tableSize = [process.argv[2], process.argv[3]];
// at the start always face north
const start = [process.argv[4], process.argv[5], 'N'];

rl.on('line', (line) => {
  const commands = formatStdin(line);
  let position = start;
  commands.reduce(
    (position, command) => (position = move(position, command, size)),
    position
  );

  rl.on('close', () => {
    console.log(position);
  });
});

function formatStdin(input) {
  return input.trim().split(',').map(Number);
}

module.exports = { formatStdin };
