"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTotp = exports.totp = void 0;
const totp_1 = require("./alg/otp/totp");
const base32_1 = require("./alg/encoding/base32");
const sha_1_1 = require("./alg/crypto/sha-1");
const hmac_1 = require("./alg/crypto/hmac");
exports.totp = totp_1.totp;
function generateTotp(base32Secret) {
    const hmac = hmac_1.hmac(sha_1_1.sha1, 64);
    const secret = base32_1.base32.decode(base32Secret);
    return exports.totp(secret, hmac, 6);
}
exports.generateTotp = generateTotp;
//# sourceMappingURL=app.js.map