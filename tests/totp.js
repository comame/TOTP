import { totp } from '../src/alg/otp/totp'
import { sha1 } from '../src/alg/crypto/sha-1'
import { hmac } from '../src/alg/crypto/hmac'
import { decode as decodeHex } from '../src/alg/encoding/hex'

const secret = decodeHex('3132333435363738393031323334353637383930')

describe('Using HMAC-SHA1', () => {
    const testcases = [
        [ 59, 94287082 ],
        [ 1111111109, 7081804 ],
        [ 1111111111, 14050471 ],
        [ 1234567890, 89005924 ],
        [ 2000000000, 69279037 ],
        [ 20000000000, 65353130 ]
    ]

    const hmacFunc = hmac(sha1, 64)

    for (const testcase of testcases) {
        test('', () => {
            expect(totp(secret, hmacFunc, 8, testcase[0] * 1000)).toBe(testcase[1])
        })
    }
})
