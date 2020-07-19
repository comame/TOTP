import { encode, decode } from '../src/alg/encoding/hex'

const testcases = [
    [ '123456', [ 0x12, 0x34, 0x56 ] ],
    [ '012345', [ 0x01, 0x23, 0x45 ] ],
    [ 'abcdef', [ 0xab, 0xcd, 0xef ]],
    [ 'ABCDEF', [ 0xab, 0xcd, 0xef ]]
]

for (const testcase of testcases) {
    test(`Encode to ${testcase[0]}`, () => {
        expect(encode(new Uint8Array(testcase[1]))).toBe(testcase[0].toUpperCase())
    })
    test(`Decode ${testcase[0]}`, () => {
        expect(decode(testcase[0])).toEqual(new Uint8Array(testcase[1]))
    })
}
