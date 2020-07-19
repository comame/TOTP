"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotp = void 0;
const number_1 = require("../number");
function dt(hs) {
    const offset = hs[19] & 0b00001111;
    const p = hs.slice(offset, offset + 4);
    p[0] = p[0] & 0b01111111;
    return p;
}
function hotp(k, c, digits, hmacFunc) {
    c = new Uint8Array([
        ...new Array(c.length < 8 ? 8 - c.length : 0).fill(0),
        ...Array.from(c)
    ]);
    const hs = hmacFunc(k, c);
    const sbits = dt(hs);
    const snum = number_1.encode(sbits);
    const d = snum % (10 ** digits);
    return d;
}
exports.hotp = hotp;
//# sourceMappingURL=hotp.js.map