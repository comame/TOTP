import { encode, decode } from '../src/alg/number'

const testcases = [
    [0, []],
    [1, [1]],
    [254, [254]],
    [255, [255]],
    [256, [1, 0]],
    [257, [1, 1]],
    [258, [1, 2]],
    [65535, [255, 255]],
    [65536, [1, 0, 0]],
    [65537, [1, 0, 1]],
    [65538, [1, 0, 2]]
]

for (const testcase of testcases) {
    test(`Encode ${testcase[1]}`, () => {
        expect(encode(new Uint8Array(testcase[1]))).toBe(testcase[0])
    })
    test(`Decode ${testcase[0]}`, () => {
        expect(decode(testcase[0])).toEqual(new Uint8Array(testcase[1]))
    })
}

test('-1', () => {
    expect(decode(-1)).toEqual(new Uint8Array([]))
})
