import { HmacFunc } from '../../types'
import { hotp } from './hotp'
import { decode } from '../number'

export function totp(k: Uint8Array, hmacFunc: HmacFunc, digits: number, currentTimeMilliSeconds?: number): number {
    const unixTime = Date.now()
    const t = decode(Math.trunc((currentTimeMilliSeconds ?? unixTime) / 30 / 1000))
    return hotp(k, t, digits, hmacFunc)
}
