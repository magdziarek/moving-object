const {
  formatStdin,
  stepForward,
  stepBackwards,
  rotateClockwise,
  rotateAntiClockwise,
  move,
  findFinalPosition,
} = require('../src/app');

describe('stdin is correctly processed ', () => {
  test.each`
    input                | expected
    ${'1,2,3,2,4,0'}     | ${[1, 2, 3, 2, 4, 0]}
    ${'1,2,3,2,4,0,N,F'} | ${[1, 2, 3, 2, 4, 0]}
  `('$input to $expected', ({ input, expected }) => {
    expect(formatStdin(input)).toEqual(expected);
  });
});

describe('make a step forward from ', () => {
  test.each`
    position       | expected
    ${[1, 2, 'N']} | ${[1, 1, 'N']}
    ${[1, 2, 'S']} | ${[1, 3, 'S']}
    ${[1, 2, 'W']} | ${[0, 2, 'W']}
    ${[1, 2, 'E']} | ${[2, 2, 'E']}
  `('$position to $expected', ({ position, expected }) => {
    expect(stepForward(position)).toEqual(expected);
  });
});

describe('make a step backwards from ', () => {
  test.each`
    position       | expected
    ${[1, 2, 'N']} | ${[1, 3, 'N']}
    ${[1, 2, 'S']} | ${[1, 1, 'S']}
    ${[1, 2, 'W']} | ${[2, 2, 'W']}
    ${[1, 2, 'E']} | ${[0, 2, 'E']}
  `('$position to $expected', ({ position, expected }) => {
    expect(stepBackwards(position)).toEqual(expected);
  });
});

describe('rotate clockwise from ', () => {
  test.each`
    position       | expected
    ${[1, 2, 'N']} | ${[1, 2, 'E']}
    ${[1, 2, 'S']} | ${[1, 2, 'W']}
    ${[1, 2, 'W']} | ${[1, 2, 'N']}
    ${[1, 2, 'E']} | ${[1, 2, 'S']}
  `('$position to $expected', ({ position, expected }) => {
    expect(rotateClockwise(position)).toEqual(expected);
  });
});

describe('rotate antiClockwise from ', () => {
  test.each`
    position       | expected
    ${[1, 2, 'N']} | ${[1, 2, 'W']}
    ${[1, 2, 'S']} | ${[1, 2, 'E']}
    ${[1, 2, 'W']} | ${[1, 2, 'S']}
    ${[1, 2, 'E']} | ${[1, 2, 'N']}
  `('$position to $expected', ({ position, expected }) => {
    expect(rotateAntiClockwise(position)).toEqual(expected);
  });
});

describe('find final position from ', () => {
  test.each`
    start          | commands           | size      | expected
    ${[1, 2, 'N']} | ${[1, 1, 4, 1, 2]} | ${[5, 5]} | ${[1, 0, 'W']}
    ${[4, 4, 'N']} | ${[1, 1, 3, 2, 2]} | ${[5, 5]} | ${[2, 2, 'E']}
  `('$start to $expected', ({ start, commands, size, expected }) => {
    expect(findFinalPosition(commands, start)).toEqual(expected);
  });
});
