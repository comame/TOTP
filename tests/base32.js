import { decode, encode } from '../src/alg/base32'

function testByte(testcases) {
    for (const message of Object.keys(testcases)) {
        test(`Decode ${message}`, () => {
                expect(decode(message)).toEqual(new Uint8Array(testcases[message]))
        })
        test(`Encode ${testcases[message]}`, () => {
            expect(encode(new Uint8Array(testcases[message]))).toBe(message)
        })
    }
}

function testString(testcases) {
    for (const message of Object.keys(testcases)) {
        test(`Decode ${message}`, () => {
            expect(decode(message)).toEqual(new Uint8Array(testcases[message].split('').map(it => it.charCodeAt(0))))
        })
        test(`Encode ${testcases[message]}`, () => {
            expect(encode(new Uint8Array(testcases[message].split('').map(it => it.charCodeAt(0))))).toBe(message)
        })
    }
}


describe('Sample case', () => {
    const testcases = {
        'NBQXEYLTN52Q====': [ 104, 97, 114, 97, 115, 111, 117 ],
        'CI2FM6EQVPG66===': [ 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef ]
    }
    testByte(testcases)
})

test('Invalid Message', () => {
    expect(() => { decode('a') }).toThrow('invalid_message')
})

describe('Padding', () => {
    const testcases = {
        'AA======': [ 0 ],
        'B4======': [ 0xf ],
        '74======': [ 0xff ],
        'B77Q====': [ 0xf, 0xff ],
        '777Q====': [ 0xff, 0xff ],
        'B7776===': [ 0xf, 0xff, 0xff ],
        '77776===': [ 0xff, 0xff, 0xff ],
        'B77777Y=': [ 0xf, 0xff, 0xff, 0xff],
        '777777Y=': [ 0xff, 0xff, 0xff, 0xff ],
        'B7777777': [ 0xf, 0xff, 0xff, 0xff, 0xff ],
        '77777777': [ 0xff, 0xff, 0xff, 0xff, 0xff ]
    }
    testByte(testcases)
})


// https://golang.org/src/encoding/base32/base32_test.go

describe('RFC 4648', () => {
    const testcases ={
        '': '',
        'MY======': 'f',
        'MZXQ====': 'fo',
        'MZXW6===': 'foo',
        'MZXW6YQ=': 'foob',
        'MZXW6YTB': 'fooba',
        'MZXW6YTBOI======': 'foobar'
    }
    testString(testcases)
})

describe('Wikipedia examples', () => {
    const testcases = {
        'ON2XEZJO': 'sure.',
        'ON2XEZI=': 'sure',
        'ON2XE===': 'sur',
        'ON2Q====': 'su',
        'NRSWC43VOJSS4===': 'leasure.',
        'MVQXG5LSMUXA====': 'easure.',
        'MFZXK4TFFY======': 'asure.',
        'ON2XEZJO': 'sure.'
    }
    testString(testcases)
})

describe('Big', () => {
    const testcases = {
        'KR3WC4ZAMJZGS3DMNFTSYIDBNZSCA5DIMUQHG3DJORUHSIDUN53GK4Y=': 'Twas brillig, and the slithy toves'
    }
    testString(testcases)
})
