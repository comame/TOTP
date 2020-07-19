import { hotp } from '../src/alg/otp/hotp'
import { sha1 } from '../src/alg/crypto/sha-1'
import { hmac } from '../src/alg/crypto/hmac'
import { decode as decodeHex } from '../src/alg/encoding/hex'

const testcases = [
    755224,
    287082,
    359152,
    969429,
    338314,
    254676,
    287922,
    162583,
    399871,
    520489
]

const secret = decodeHex('3132333435363738393031323334353637383930')

for (let i = 0; i < testcases.length; i += 1) {
    test(i + '', () => {
        expect(hotp(secret, new Uint8Array([i]), hmac(sha1, 64))).toBe(testcases[i])
    })
}
