export type HashFunc = (message: Uint8Array) => Uint8Array

export type HmacFunc = (secret: Uint8Array, message: Uint8Array, hashFunc: HashFunc) => Uint8Array
