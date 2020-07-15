import { HashFunc, HmacFunc } from '../../types'
import { hotp } from './hotp'
import { numToBytes } from '../numToBytes'

export function totp(k: Uint8Array, step: number = 30, hashFunc: HashFunc, hmacFunc: HmacFunc): number {
    const unixTime = Date.now()
    const t = numToBytes(Math.floor(unixTime / step))
    return hotp(k, t, hashFunc, hmacFunc)
}
