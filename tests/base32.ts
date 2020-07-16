import { decode, encode } from '../src/alg/base32'

describe('Decode', () => {
    test('Decode', () => {
        expect(decode('NBQXEYLTN52Q====')).toEqual(new Uint8Array([ 104, 97, 114, 97, 115, 111, 117 ]))
    })

    test('Decode', () => {
        expect(decode('CI2FM6EQVPG66===')).toEqual(new Uint8Array([ 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef ]))
    })


    test('Decode', () => {
        expect(decode('AA======')).toEqual(new Uint8Array([ 0 ]))
    })

    test('Decode', () => {
        expect(decode('B4======')).toEqual(new Uint8Array([ 0xf ]))
    })

    test('Decode', () => {
        expect(decode('74======')).toEqual(new Uint8Array([ 0xff ]))
    })

    test('Decode', () => {
        expect(decode('B77Q====')).toEqual(new Uint8Array([ 0xf, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('777Q====')).toEqual(new Uint8Array([ 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('B7776===')).toEqual(new Uint8Array([ 0xf, 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('77776===')).toEqual(new Uint8Array([ 0xff, 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('B77777Y=')).toEqual(new Uint8Array([ 0xf, 0xff, 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('777777Y=')).toEqual(new Uint8Array([ 0xff, 0xff, 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('B7777777')).toEqual(new Uint8Array([ 0xf, 0xff, 0xff, 0xff, 0xff ]))
    })

    test('Decode', () => {
        expect(decode('77777777')).toEqual(new Uint8Array([ 0xff, 0xff, 0xff, 0xff, 0xff ]))
    })

    test('Invalid Message', () => {
        expect(() => { decode('a') }).toThrow('invalid_message')
    })
})

describe('Encode', () => {
    test('Encode', () => {
        expect(encode(new Uint8Array([ 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef ]))).toBe('CI2FM6EQVPG66===')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 104, 97, 114, 97, 115, 111, 117 ]))).toBe('NBQXEYLTN52Q====')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0 ]))).toBe('AA======')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xf ]))).toBe('B4======')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xff ]))).toBe('74======')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xf, 0xff ]))).toBe('B77Q====')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xff, 0xff]))).toBe('777Q====')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xf, 0xff, 0xff ]))).toBe('B7776===')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xff, 0xff, 0xff ]))).toBe('77776===')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xf, 0xff, 0xff, 0xff ]))).toBe('B77777Y=')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xff, 0xff, 0xff, 0xff ]))).toBe('777777Y=')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xf, 0xff, 0xff, 0xff, 0xff ]))).toBe('B7777777')
    })

    test('Encode', () => {
        expect(encode(new Uint8Array([ 0xff, 0xff, 0xff, 0xff, 0xff ]))).toBe('77777777')
    })
})
