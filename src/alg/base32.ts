const encodeMap: Map<number, string> = new Map()
const decodeMap: Map<string, number> = new Map()

for (let i = 0; i <= 25; i += 1) {
    const char = String.fromCharCode('A'.charCodeAt(0) + i)
    encodeMap.set(i, char)
    decodeMap.set(char, i)
}

for (let i = 26; i <= 31; i += 1) {
    const char = '' + (i - 24)
    encodeMap.set(i, char)
    decodeMap.set(char, i)
}

encodeMap.set(32, '=')
decodeMap.set('=', 32)

export function decode(message: string): Uint8Array {
    const bits = []
    for (const char of message) {
        const word = decodeMap.get(char)
        if (typeof word != 'number') throw 'invalid_message'
        if (word == 32) break

        for (let i = 0; i < 5; i += 1) {
            bits.push((word & (1 << 4 - i)) != 0)
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

export function encode(bytes: Uint8Array): string {
    const bits: boolean[] = []
    for (let i = 0; i < bytes.length; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            bits.push((bytes[i] & (1 << (7 - j))) != 0)
        }
    }

    const words = []
    for (let i = 0; i < bits.length / 5; i += 1) {
        let num = 0
        const length = (i * 5 + 5 > bits.length) ? (bits.length - i * 5) : 5
        const sliced = bits.slice(i * 5, i * 5 + length)
        for (let j = 0; j < length; j += 1) {
            if (sliced[j]) num += 1 << (4 - j)
        }
        words.push(encodeMap.get(num))
    }

    let base32 =  words.join('')
    const paddingSize = Math.ceil(base32.length / 8) * 8 - base32.length
    for (let i = 0; i < paddingSize; i += 1) base32 += '='
    return base32
}
