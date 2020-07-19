import { HmacFunc } from '../../types'
import { encode } from '../number'

function dt(hs: Uint8Array): Uint8Array {
    const offset = hs[19] & 0b00001111
    const p = hs.slice(offset, offset + 4)
    p[0] = p[0] & 0b01111111
    return p
}

export function hotp(k: Uint8Array, c: Uint8Array, digits: number, hmacFunc: HmacFunc): number {
    c = new Uint8Array([
        ...new Array(c.length < 8 ? 8 - c.length : 0).fill(0),
        ...Array.from(c)
    ])

    const hs = hmacFunc(k, c)
    const sbits = dt(hs)
    const snum = encode(sbits)
    const d = snum % (10 ** digits)

    return d
}
