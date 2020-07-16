export type HashFunc = (message: Uint8Array) => Uint8Array

export type HmacFunc = (hashFunc: HashFunc) => (secret: Uint8Array, message: Uint8Array) => Uint8Array
