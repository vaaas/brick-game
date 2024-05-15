export default class BitArray {
	constructor(length) {
		this.bytes = new Uint8Array(BitArray.bytes_needed(length))
		for (let i = 0; i < this.bytes.length; i++)
			this.bytes[i] = 0
		this.length = length
	}

	forEach(f) {
		let b = 0
		let B = 0
		while (b < this.length) {
			const octet = this.bytes[B]
			let flag = 0b0000_0001
			while(b < this.length && flag <= 0b1000_0000) {
				let bit = octet & flag
				f(bit > 0, b)
				flag = flag << 1
				b += 1
			}
			B += 1
		}
	}

	set(index, value) {
		const byte_index = BitArray.bytes_needed(index + 1) - 1
		let octet = this.bytes[byte_index]
		const remainder = index % 8
		const flag = 0b0000_0001 << remainder
		if (value)
			octet = octet | flag
		else
			octet = octet ^ flag
		this.bytes[byte_index] = octet
		return this
	}

	get(index) {
		const byte_index = BitArray.bytes_needed(index + 1) - 1
		const octet = this.bytes[byte_index]
		const remainder = index % 8
		const flag = 0b0000_0001 << remainder
		const bit = octet & flag
		if (bit > 0)
			return true
		else
			return false
	}

	static bytes_needed(bits) {
		const remainder = bits % 8
		const bytes = (bits - remainder) / 8
		if (remainder > 0)
			return bytes + 1
		else
			return bytes
	}
}

