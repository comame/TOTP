const encodeMap: Map<number, string> = new Map()
const decodeMap: Map<string, number> = new Map()

for (let i = 0; i <= 9; i += 1) {
    encodeMap.set(i, i + '')
    decodeMap.set(i + '', i)
}

for (let i = 10; i <= 15; i += 1) {
    const charCodeOfA = 'A'.charCodeAt(0)
    encodeMap.set(i, String.fromCharCode(charCodeOfA + i -10))
    decodeMap.set(String.fromCharCode(charCodeOfA + i -10), i)
}

export function encode(message: Uint8Array): string {
    let str = ''
    for (let i = 0; i < message.length; i += 1) {
        const byte = message[i]
        str += encodeMap.get(byte >> 4)!! + encodeMap.get(byte & 0b1111)
    }
    return str
}

export function decode(message: string): Uint8Array {
    message = message.toUpperCase()

    const byteArray: number[] = []
    if (message.length % 2 == 1) {
        byteArray.push(decodeMap.get(message[0])!!)
        message = message.slice(1)
    }

    for (let i = 0; i < message.length / 2; i += 1) {
        byteArray.push((decodeMap.get(message[i * 2])!! << 4) + (decodeMap.get(message[i * 2 + 1])!!))
    }

    return new Uint8Array([ ...byteArray ])
}
