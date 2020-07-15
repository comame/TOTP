import { numToBytes } from '../src/alg/numToBytes'

test('0', () => {
    expect(numToBytes(0)).toEqual(new Uint8Array([]))
})

test('1', () => {
    expect(numToBytes(1)).toEqual(new Uint8Array([ 1 ]))
})

test('254', () => {
    expect(numToBytes(254)).toEqual(new Uint8Array([ 254 ]))
})

test('255', () => {
    expect(numToBytes(255)).toEqual(new Uint8Array([ 255 ]))
})

test('256', () => {
    expect(numToBytes(256)).toEqual(new Uint8Array([ 1, 0 ]))
})

test('257', () => {
    expect(numToBytes(257)).toEqual(new Uint8Array([ 1, 1 ]))
})

test('258', () => {
    expect(numToBytes(258)).toEqual(new Uint8Array([ 1, 2 ]))
})

test('65535', () => {
    expect(numToBytes(65535)).toEqual(new Uint8Array([ 255, 255 ]))
})

test('65536', () => {
    expect(numToBytes(65536)).toEqual(new Uint8Array([ 1, 0, 0 ]))
})

test('65537', () => {
    expect(numToBytes(65537)).toEqual(new Uint8Array([ 1, 0, 1 ]))
})

test('-1', () => {
    expect(numToBytes(-1)).toEqual(new Uint8Array([]))
})
