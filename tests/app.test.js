const { formatStdin } = require('../src/app');

describe('stdin is correctly processed ', () => {
  test.each`
    input         | expected
    ${'1,2,5,10'} | ${[1, 2, 5, 10]}
  `('$input to $expected', ({ input, expected }) => {
    expect(formatStdin(input)).toEqual(expected);
  });
});
