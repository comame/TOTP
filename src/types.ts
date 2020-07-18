export type HashFunc = (message: Uint8Array) => Uint8Array

export type HmacFunc = (hashFunc: HashFunc, blockLengthByte: number) => (secret: Uint8Array, message: Uint8Array) => Uint8Array
