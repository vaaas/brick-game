function square(x, y, width, border='black') {
	return function(context) {
		context.strokeStyle = border
		context.strokeRect(x, y, width, width)
		context.strokeStyle = null
		return context
	}
}

function filledSquare(x, y, width, fill='black') {
	return function(context) {
		context.fillStyle = 'black'
		context.fillRect(x, y, width, width)
		context.fillStyle = null
		return context
	}
}

function block(x, y, width, padding=2, colour='black') {
	const outline = square(x, y, width, colour)
	const fill = filledSquare(x + padding, y + padding, width - padding*2 - 1, colour)

	return function (context) {
		return outline(fill(context))
	}
}

class BitArray {
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

function main() {
	const width = 20
	const height = 40
	const screen = new BitArray(width*height)

	const canvas = document.getElementById('game')
	const context = canvas.getContext('2d')

	screen.set(0, true)
	screen.set(1, true)
	screen.set(105, true)

	const pixels_per_block = 10

	screen.forEach((enabled, index) => {
		if (!enabled) return
		const x = index % width
		const y = (index - x)/width
		block(x*pixels_per_block, y*pixels_per_block,pixels_per_block)(context)
	})
}

window.onload = main
