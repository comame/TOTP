import { BaseEncoding } from '../../types'
import { baseEncoding } from './base'

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

export const base32: BaseEncoding = baseEncoding(5, encodeMap, decodeMap)
