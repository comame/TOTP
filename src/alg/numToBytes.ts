export function numToBytes(num: number): Uint8Array {
    const bytes = []
    let left = num
    while (left > 0) {
        bytes.push(left & 255)
        left = left >> 8
    }
    return new Uint8Array(bytes.reverse())
}
