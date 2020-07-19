import { totp as _totp } from './alg/otp/totp'
import { base32 } from './alg/encoding/base32'
import { HmacFunc } from './types'
import { sha1 } from './alg/crypto/sha-1'
import { hmac as hmacGenerator } from './alg/crypto/hmac'

export const totp = _totp

export function generateTotp(base32Secret: string): number {
    const hmac: HmacFunc = hmacGenerator(sha1, 64)
    const secret = base32.decode(base32Secret)

    return totp(secret, hmac, 6)
}
