const { formatStdin, stepForward, stepBackwards } = require('../src/app');

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
