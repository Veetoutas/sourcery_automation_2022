const isTriangle = require('./isTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isTriangle(3, 4, 5)).toBe(true);
});

test('1, 1, 1 is triangle', () => {
    expect(isTriangle(1, 1, 1)).toBe(true);
});

test('0, 0, 0 is triangle', () => {
    expect(isTriangle(0, 0, 0)).toBe(false);
});

test('-1, 1, 1 is triangle', () => {
    expect(isTriangle(-1, 1, 1)).toBe(false);
});