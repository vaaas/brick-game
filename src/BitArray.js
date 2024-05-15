export default class BitArray {
	constructor(length) {
		this.bits = new Uint8Array(BitArray.number_of_bytes_required(length))
		for (let i = 0; i < this.bits.length; i++)
			screen[i] = 0
		this.length = length
	}

	forEach(f) {
		let b = 0
		let B = 0
		while (b < this.length) {
			const octet = this.bits[B]
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
		const byte_index = BitArray.bit_to_byte_index(index)
		let octet = this.bits[byte_index]
		const remainder = index % 8
		const flag = 0b0000_0001 << remainder
		if (value)
			octet = octet | flag
		else
			octet = octet ^ flag
		this.bits[byte_index] = octet
		return this
	}

	get(index) {
		const byte_index = BitArray.bit_to_byte_index(index)
		const octet = this.bits[byte_index]
		const remainder = index % 8
		const flag = 0b0000_0001 << remainder
		const bit = octet & flag
		if (bit > 0)
			return true
		else
			return false
	}

	static bit_to_byte_index(bits) {
		const remainder = bits % 8
		let bytes = (bits - remainder) / 8
		return bytes
	}

	static number_of_bytes_required(bits) {
		const remainder = bits % 8
		let bytes = (bits - remainder) / 8
		if (remainder > 0)
			bytes += 1
		return bytes
	}
}

