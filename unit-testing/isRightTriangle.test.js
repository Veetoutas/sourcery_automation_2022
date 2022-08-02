const isRightTriangle = require('./isRightTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
});

test('1, 1, 1 is triangle', () => {
    expect(isRightTriangle(1, 1, 1)).toBe(false);
});

test('0, 0, 0 is triangle', () => {
    expect(isRightTriangle(0, 0, 0)).toBe(false);
});

test('-1, 1, 1 is triangle', () => {
    expect(isRightTriangle(-1, 1, 1)).toBe(false);
});