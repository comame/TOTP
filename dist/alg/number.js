"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
function decode(num) {
    const bytes = [];
    let left = num;
    while (left > 0) {
        bytes.push(left & 255);
        left = Math.floor(left / 2 ** 8);
    }
    return new Uint8Array(bytes.reverse());
}
exports.decode = decode;
function encode(bytes) {
    let sum = 0;
    for (let i = 0; i < bytes.length; i += 1) {
        sum += bytes[i] * 2 ** ((bytes.length - 1 - i) * 8);
    }
    return sum;
}
exports.encode = encode;
//# sourceMappingURL=number.js.map