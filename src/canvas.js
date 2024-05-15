export function square(x, y, width, border='black') {
	return function(context) {
		context.strokeStyle = border
		context.strokeRect(x, y, width, width)
		context.strokeStyle = null
		return context
	}
}

export function filledSquare(x, y, width, fill='black') {
	return function(context) {
		context.fillStyle = 'black'
		context.fillRect(x, y, width, width)
		context.fillStyle = null
		return context
	}
}

export function block(x, y, width, padding=2, colour='black') {
	const outline = square(x, y, width, colour)
	const fill = filledSquare(x + padding, y + padding, width - padding*2 - 1, colour)

	return function (context) {
		return outline(fill(context))
	}
}


