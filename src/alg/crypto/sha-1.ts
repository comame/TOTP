import { decode, encode } from '../number'
import { HashFunc } from '../../types'

function padding(message: Uint8Array): Uint8Array {
    let padded = new Uint8Array([ ...Array.from(message), 0x80 ])

    const zeroPadding: number[] = new Array(Math.ceil(padded.length / 616) * 64 - padded.length - 8).fill(0x00)
    padded = new Uint8Array([ ...Array.from(padded), ...zeroPadding ])

    let originalMessageSize = decode(message.length * 8)
    if (originalMessageSize.length < 8) {
        const beforeBytes = new Array(8 - originalMessageSize.length).fill(0x00)
        originalMessageSize = new Uint8Array([ ...beforeBytes, ...Array.from(originalMessageSize) ])
    }
    padded = new Uint8Array([ ...Array.from(padded), ...Array.from(originalMessageSize) ])

    return padded
}

function circularShift(n: number, bytes: number): number {
    let bits: boolean[] = new Array(32)
    for (let i = 0; i < 32; i += 1) {
        bits[i] = (bytes & (2 ** i)) != 0
    }
    bits = bits.reverse()

    const newBits = [ ...bits.slice(n), ...bits.slice(0, n) ]

    let sum = 0
    for (let i = 0; i < 32; i += 1) {
        if (newBits[31 - i]) sum += 2 ** i
    }

    return sum
}

function f(t: number, b: number, c: number, d: number): number {
    if (0 <= t && t <= 19) {
        return (b & c) | ((~b) & d)
    } else if (20 <= t && t <= 39) {
        return b ^ c ^ d
    } else if (40 <= t && t <= 59) {
        return (b & c) | (b & d) | (c & d)
    } else {
        return b ^ c ^ d
    }
}

function k(t: number): number {
    if (0 <= t && t <= 19) {
        return 0x5A827999
    } else if (20 <= t && t <= 39) {
        return 0x6ED9EBA1
    } else if (40 <= t && t <= 59) {
        return 0x8F1BBCDC
    } else {
        return 0xCA62C1D6
    }
}

export const sha1: HashFunc = (message: Uint8Array): Uint8Array => {
    const padded = padding(message)

    const m: Uint8Array[] = new Array(padded.length / 64)
    for (let i = 0; i < padded.length / 64; i += 1) {
        m[i] = padded.slice(i * 64, i * 64 + 64)
    }

    let h0 = 0x67452301
    let h1 = 0xEFCDAB89
    let h2 = 0x98BADCFE
    let h3 = 0x10325476
    let h4 = 0xC3D2E1F0

    for (const mi of m) {
        const w: number[] = new Array(16)
        for (let i = 0; i < 16; i += 1) {
            w[i] = encode(mi.slice(i * 4, i * 4 + 4))
        }

        for (let t = 16; t <= 79; t += 1) {
            w[t] = circularShift(1, w[t-3] ^ w[t-8] ^ w[t-14] ^ w[t-16])
        }

        let a = h0
        let b = h1
        let c = h2
        let d = h3
        let e = h4

        for (let t = 0; t <= 79; t += 1) {
            const tmp = (circularShift(5, a) + f(t, b, c, d) + e + w[t] + k(t)) % (2 ** 32)
            e = d
            d = c
            c = circularShift(30, b)
            b = a
            a = tmp
        }

        h0 = (h0 + a) % (2 ** 32)
        h1 = (h1 + b) % (2 ** 32)
        h2 = (h2 + c) % (2 ** 32)
        h3 = (h3 + d) % (2 ** 32)
        h4 = (h4 + e) % (2 ** 32)
    }

    const hbytes = [
        decode(h0),
        decode(h1),
        decode(h2),
        decode(h3),
        decode(h4),
    ].map(arr => {
        return new Uint8Array([
            ...new Array(4 - arr.length).fill(0),
            ...Array.from(arr)
        ])
    })

    return new Uint8Array([
        ...Array.from(hbytes[0]),
        ...Array.from(hbytes[1]),
        ...Array.from(hbytes[2]),
        ...Array.from(hbytes[3]),
        ...Array.from(hbytes[4]),
    ])
}
