import { base64 } from '../src/alg/encoding/base64'

const { encode, decode } = base64

function strToByte(str) {
    return new Uint8Array(str.split('').map(it => it.charCodeAt(0)))
}

const testcases = [
    ['', ''],
    ['f', 'Zg=='],
    ['fo', 'Zm8='],
    ['foo', 'Zm9v'],
    ['foob', 'Zm9vYg=='],
    ['fooba', 'Zm9vYmE='],
    ['foobar', 'Zm9vYmFy'],
    ['sure.', 'c3VyZS4='],
    ['sure', 'c3VyZQ=='],
    ['sur', 'c3Vy'],
    ['su', 'c3U='],
    ['leasure.', 'bGVhc3VyZS4='],
    ['easure.', 'ZWFzdXJlLg=='],
    ['asure.', 'YXN1cmUu'],
    ['sure.', 'c3VyZS4='],
]

for (const testcase of testcases) {
    test(`Encode ${testcase[0]}`, () => {
        expect(encode(strToByte(testcase[0]))).toBe(testcase[1])
    })
    test(`Decode ${testcase[1]}`, () => {
        expect(decode(testcase[1])).toEqual(strToByte(testcase[0]))
    })
}
