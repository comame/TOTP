"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base32 = void 0;
const base_1 = require("./base");
const encodeMap = new Map();
const decodeMap = new Map();
for (let i = 0; i <= 25; i += 1) {
    const char = String.fromCharCode('A'.charCodeAt(0) + i);
    encodeMap.set(i, char);
    decodeMap.set(char, i);
}
for (let i = 26; i <= 31; i += 1) {
    const char = '' + (i - 24);
    encodeMap.set(i, char);
    decodeMap.set(char, i);
}
exports.base32 = base_1.baseEncoding(5, 8, encodeMap, decodeMap);
//# sourceMappingURL=base32.js.map