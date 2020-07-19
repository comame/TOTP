"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64 = void 0;
const base_1 = require("./base");
const encodeMap = new Map();
const decodeMap = new Map();
for (let i = 0; i <= 25; i += 1) {
    const char = String.fromCharCode('A'.charCodeAt(0) + i);
    encodeMap.set(i, char);
    decodeMap.set(char, i);
}
for (let i = 26; i <= 51; i += 1) {
    const char = String.fromCharCode('a'.charCodeAt(0) + (i - 26));
    encodeMap.set(i, char);
    decodeMap.set(char, i);
}
for (let i = 52; i <= 61; i += 1) {
    const char = (i - 52) + '';
    encodeMap.set(i, char);
    decodeMap.set(char, i);
}
encodeMap.set(62, '+');
decodeMap.set('+', 62);
encodeMap.set(63, '/');
decodeMap.set('/', 63);
exports.base64 = base_1.baseEncoding(6, 4, encodeMap, decodeMap);
//# sourceMappingURL=base64.js.map