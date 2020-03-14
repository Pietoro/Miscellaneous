const reverseString = require('./reversestring');

test('reverseString function exists', () => {
    expect(reverseString).toBeDefined();
});

test('String should be reversed', () => {
    expect(reverseString('string')).toEqual('gnirts');
});

test('Reversed should be case sensitive', () => {
    expect(reverseString('String')).not.toEqual('gnirts');
});
