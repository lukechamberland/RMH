const { returnDeck } = require('../src/helpers');
const { test } = require('@jest/globals');

test('returns an array', () => {
  expect(Array.isArray(returnDeck())).toBe(true);
});