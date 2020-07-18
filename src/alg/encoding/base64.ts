import { BaseEncoding } from '../../types'
import { baseEncoding } from './base'

const encodeMap: Map<number, string> = new Map()
const decodeMap: Map<string, number> = new Map()

for (let i = 0; i <= 25; i += 1) {
    const char = String.fromCharCode('A'.charCodeAt(0) + i)
    encodeMap.set(i, char)
    decodeMap.set(char, i)
}

for (let i = 26; i <= 51; i += 1) {
    const char = String.fromCharCode('a'.charCodeAt(0) + (i - 26))
    encodeMap.set(i, char)
    decodeMap.set(char, i)
}

for (let i = 52; i <= 61; i += 1) {
    const char = (i - 52) + ''
    encodeMap.set(i, char)
    decodeMap.set(char, i)
}

encodeMap.set(62, '+')
decodeMap.set('+', 62)
encodeMap.set(63, '/')
decodeMap.set('/', 63)

export const base64: BaseEncoding = baseEncoding(6, 4, encodeMap, decodeMap)
