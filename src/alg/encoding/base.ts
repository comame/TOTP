import { BaseEncodingFunc } from '../../types'

export const baseEncoding: BaseEncodingFunc = (wordSize: number, lengthUnit: number, encodeMap: Map<number, string>, decodeMap: Map<string, number>) => ({
    encode: (payload: Uint8Array): string => {
        const bits: boolean[] = []
        for (let i = 0; i < payload.length; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                bits.push((payload[i] & (1 << (7 - j))) != 0)
            }
        }

        const words = []
        for (let i = 0; i < bits.length / wordSize; i += 1) {
            let num = 0
            const length = (i * wordSize + wordSize > bits.length) ? (bits.length - i * wordSize) : wordSize
            const sliced = bits.slice(i * wordSize, i * wordSize + length)
            for (let j = 0; j < length; j += 1) {
                if (sliced[j]) num += 1 << ((wordSize - 1) - j)
            }
            words.push(encodeMap.get(num))
        }

        let base32 =  words.join('')
        const paddingSize = Math.ceil(base32.length / lengthUnit) * lengthUnit - base32.length
        for (let i = 0; i < paddingSize; i += 1) base32 += '='
        return base32
    },

    decode: (message: string): Uint8Array => {
        if (message.length % lengthUnit != 0) throw 'invalid_message'

        const bits = []
        for (const char of message) {
            const word = decodeMap.get(char)
            if (char == '=') break
            if (typeof word != 'number') throw 'invalid_message'

            for (let i = 0; i < wordSize; i += 1) {
                bits.push((word & (1 << (wordSize - 1) - i)) != 0)
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
