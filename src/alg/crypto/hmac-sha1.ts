import { HashFunc, HmacFunc } from '../../types'

export const hmacSha1: HmacFunc = (hashFunc: HashFunc) => (secret: Uint8Array, message: Uint8Array): Uint8Array => {
    return new Uint8Array
}
