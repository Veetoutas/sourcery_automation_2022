const isTriangle = require('./isTriangle');

function isRightTriangle(a, b, c) {
    return isTriangle(a, b, c) && (c*c == a*a + b*b) || (a*a == b*b + c*c) || (b*b == a*a + c*c);
}

module.exports = isRightTriangle;