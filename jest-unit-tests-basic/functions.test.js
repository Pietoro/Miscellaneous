const functions = require('./functions');

beforeEach(() => console.log('Start test'));
afterEach(() => console.log('End test'));


test('The sum of 2 and 2 is equal to 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

test('The sum of 2 and 2 is not equal to 5', () => {
    expect(functions.add(2,2)).not.toBe(5);
});

test('Should be null', () => {
    expect(functions.isNull()).toBeNull();
});

test('Should be falsy', () => {
    expect(functions.checkValue(null)).toBeFalsy();
});

test('User should be Slav Kusinski', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'Slav',
        lastName: 'Kusinski'
    });
});

test('Should be under 5000', () => {
    const load1 = 1000;
    const load2 = 3000;
    expect(functions.add(load1,load2)).toBeLessThan(5000);
});

test('There is no "I" in "team"', () => {
    expect('team').not.toMatch(/I/);
});

test('Admin should be in usernames', () => {
    usernames = ['john', 'bob', 'lisa', 'admin'];
    expect(usernames).toContain('admin');
});

test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser()
        .then(data => {
            expect(data.name).toEqual('Leanne Graham');
    });
});

test('User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
});
