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

export function decode(message: string): Uint8Array {
    const bits = []
    for (const char of message) {
        if (char == '=') break
        const word = decodeMap.get(char)
        if (typeof word != 'number') throw 'invalid_message'
        bits.push(
            (word & 0b10000) != 0,
            (word & 0b01000) != 0,
            (word & 0b00100) != 0,
            (word & 0b00010) != 0,
            (word & 0b00001) != 0
        )
    }

    const words = []
    for (let i = 0; i < bits.length / 8; i += 1) {
        if (i * 8 + 8 > bits.length) break

        let word = 0
        const wordBits = bits.slice(i * 8, i * 8 + 8)

        if (wordBits[0]) word += 0b10000000
        if (wordBits[1]) word += 0b01000000
        if (wordBits[2]) word += 0b00100000
        if (wordBits[3]) word += 0b00010000
        if (wordBits[4]) word += 0b00001000
        if (wordBits[5]) word += 0b00000100
        if (wordBits[6]) word += 0b00000010
        if (wordBits[7]) word += 0b00000001

        words.push(word)
    }

    return new Uint8Array(words)
}

export function encode(bytes: Uint8Array): string {
    const fiveBits = []

    for (let i = 0; i < Math.ceil(bytes.length / 5); i += 1) {
        fiveBits.push(
            (bytes[i * 5] & 0b11111000) >> 3,
            ((bytes[i * 5] & 0b00000111) << 2) + ((bytes[i * 5 + 1] & 0b11000000) >> 6),
            i * 5 + 1 < bytes.length ? (bytes[i * 5 + 1] & 0b00111110) >> 1 : 32,
            i * 5 + 1 < bytes.length ? ((bytes[i * 5 + 1] & 0b00000001) << 4) + ((bytes[i * 5 + 2] & 0b11110000) >> 4) : 32,
            i * 5 + 2 < bytes.length ? ((bytes[i * 5 + 2] & 0b00001111) << 1) + ((bytes[i * 5 + 3] & 0b10000000) >> 7) : 32,
            i * 5 + 3 < bytes.length ? (bytes[i * 5 + 3] & 0b01111100) >> 2 : 32,
            i * 5 + 3 < bytes.length ? ((bytes[i * 5 + 3] & 0b00000011) << 3) + ((bytes[i * 5 + 4] & 0b11100000) >> 5) : 32,
            i * 5 + 4 < bytes.length ? bytes[i * 5 + 4] & 0b00011111 : 32
        )
    }

    let message = ''
    for (const word of fiveBits) {
        message += encodeMap.get(word)
    }

    return message
}