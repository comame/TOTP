import { BaseEncodingFunc } from '../../types'

export const baseEncoding: BaseEncodingFunc = (wordBits: number, encodeMap: Map<number, string>, decodeMap: Map<string, number>) => ({
    encode: (payload: Uint8Array): string => {
        const bits: boolean[] = []
        for (let i = 0; i < payload.length; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                bits.push((payload[i] & (1 << (7 - j))) != 0)
            }
        }

        const words = []
        for (let i = 0; i < bits.length / wordBits; i += 1) {
            let num = 0
            const length = (i * wordBits + wordBits > bits.length) ? (bits.length - i * wordBits) : wordBits
            const sliced = bits.slice(i * wordBits, i * wordBits + length)
            for (let j = 0; j < length; j += 1) {
                if (sliced[j]) num += 1 << ((wordBits - 1) - j)
            }
            words.push(encodeMap.get(num))
        }

        let base32 =  words.join('')
        const paddingSize = Math.ceil(base32.length / 8) * 8 - base32.length
        for (let i = 0; i < paddingSize; i += 1) base32 += '='
        return base32
    },

    decode: (message: string): Uint8Array => {
        const bits = []
    for (const char of message) {
        const word = decodeMap.get(char)
        if (typeof word != 'number') throw 'invalid_message'
        if (word == 32) break

        for (let i = 0; i < wordBits; i += 1) {
            bits.push((word & (1 << (wordBits - 1) - i)) != 0)
        }
    }

    const bytes = []
    for (let i = 0; i < bits.length / 8; i += 1) {
        // Skipped bits are 0 padding, so safe to break.
        if (i * 8 + 8 > bits.length) break

        let byte = 0
        const wordBits = bits.slice(i * 8, i * 8 + 8)

        for (let j = 0; j < 8; j += 1) {
            if (wordBits[j]) byte += 1 << (7 - j)
        }

        bytes.push(byte)
    }

    return new Uint8Array(bytes)
    }
})
