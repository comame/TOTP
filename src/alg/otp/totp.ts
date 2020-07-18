import { HashFunc, HmacFunc } from '../../types'
import { hotp } from './hotp'
import { decode } from '../number'

export function totp(k: Uint8Array, step: number = 30, hmacFunc: HmacFunc): number {
    const unixTime = Date.now()
    const t = decode(Math.floor(unixTime / step))
    return hotp(k, t, hmacFunc)
}
