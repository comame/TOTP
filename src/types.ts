export type HashFunc = (message: Uint8Array) => Uint8Array

export type HmacFunc = (hashFunc: HashFunc, blockLengthByte: number) => (secret: Uint8Array, message: Uint8Array) => Uint8Array

export type BaseEncodingFunc = (wordSize: number, lengthUnit: number, encodeMap: Map<number, string>, decodeMap: Map<string, number>) => BaseEncoding

export type BaseEncoding = {
    encode: (payload: Uint8Array) => string,
    decode: (message: string) => Uint8Array
}
