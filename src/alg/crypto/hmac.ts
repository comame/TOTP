import { HashFunc, Hmac } from '../../types'

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
    return new Uint8Array([ ...Array.from(a), ...Array.from(b) ])
}

function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
    const bytes = []
    bytes.length = a.length

    for (let i = 0; i < a.length; i += 1) {
        bytes[i] = a[i] ^ b[i]
    }

    return new Uint8Array(bytes)
}

export const hmac: Hmac = (hashFunc: HashFunc, blockLengthByte: number) => (secret: Uint8Array, message: Uint8Array): Uint8Array => {
    const opad = new Uint8Array(blockLengthByte)
    const ipad = new Uint8Array(blockLengthByte)

    let key = Uint8Array.from(secret)
    if (secret.length > blockLengthByte) {
        key = hashFunc(secret)
    }
    if (key.length < blockLengthByte) {
        const padding: number[] = []
        padding.length = blockLengthByte - key.length
        key = new Uint8Array([ ...Array.from(key), ...padding.fill(0x00) ])
    }

    for (let i = 0; i < blockLengthByte; i += 1) {
        opad[i] = 0x5c
        ipad[i] = 0x36
    }

    const a = xor(key, opad)
    const b = xor(key, ipad)
    const c = hashFunc(concat(b, message))
    const answer = hashFunc(concat(a, c))
    return answer
}
