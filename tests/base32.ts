import { decodeBase32 } from '../src/alg/base32'

test('Decode', () => {
    expect(decodeBase32('NBQXEYLTN52Q====')).toEqual(new Uint8Array([
        0b01101000,
        0b01100001,
        0b01110010,
        0b01100001,
        0b01110011,
        0b01101111,
        0b01110101
    ]))
})

test('Decode', () => {
    expect(decodeBase32('CI2FM6EQVPG66===')).toEqual(new Uint8Array([ 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef ]))
})
