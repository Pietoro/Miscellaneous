const functions = require('./functions');

test('The sum of 2 and 2 is equal to 4', () => {
    expect(functions.add(2,2)).toBe(4);
});
