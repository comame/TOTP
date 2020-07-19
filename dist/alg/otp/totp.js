"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totp = void 0;
const hotp_1 = require("./hotp");
const number_1 = require("../number");
function totp(k, hmacFunc, digits, currentTimeMilliSeconds) {
    const unixTime = Date.now();
    const t = number_1.decode(Math.trunc((currentTimeMilliSeconds !== null && currentTimeMilliSeconds !== void 0 ? currentTimeMilliSeconds : unixTime) / 30 / 1000));
    return hotp_1.hotp(k, t, digits, hmacFunc);
}
exports.totp = totp;
//# sourceMappingURL=totp.js.map