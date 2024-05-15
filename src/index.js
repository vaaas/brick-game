import BitArray from './BitArray.js'
import { block } from './canvas.js'

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
