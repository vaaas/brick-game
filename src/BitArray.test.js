import * as assert from 'node:assert/strict'
import { describe, it, test } from 'node:test'
import BitArray from './BitArray.js'

describe('BitArray', () => {
	test('bytes_needed', () => {
		assert.equal(1, BitArray.bytes_needed(8))
		assert.equal(1, BitArray.bytes_needed(7))
		assert.equal(8, BitArray.bytes_needed(64))
		assert.equal(9, BitArray.bytes_needed(68))
	})

	test('constructor', () => {
		{
			const xs = new BitArray(8)
			assert.equal(8, xs.length)
			for (let i = 0; i < xs.bytes.length; i++)
				assert.equal(0, xs.bytes[i])
			assert.equal(1, xs.bytes.length)
		}

		{
			const xs = new BitArray(7)
			assert.equal(7, xs.length)
			for (let i = 0; i < xs.bytes.length; i++)
				assert.equal(0, xs.bytes[i])
			assert.equal(1, xs.bytes.length)
		}

		{
			const xs = new BitArray(64)
			assert.equal(64, xs.length)
			for (let i = 0; i < xs.bytes.length; i++)
				assert.equal(0, xs.bytes[i])
			assert.equal(8, xs.bytes.length)
		}
	})

	describe('set', () => {
		it('should flip bytes to true', () => {
			const xs = new BitArray(1337)
			xs.set(0, true)
			assert.equal(1, xs.bytes[0])
			xs.set(1000, true)
			assert.equal(1, xs.bytes[125])
		})

		it('should flip bytes to false', () => {
			const xs = new BitArray(1337)
			xs.set(1, true)
			xs.set(0, true)
			assert.equal(3, xs.bytes[0])
			xs.set(1, false)
			assert.equal(1, xs.bytes[0])
		})

		it('should only modify bits, not bytes', () => {
			const xs = new BitArray(1337)
			xs.set(1, true)
			assert.equal(2, xs.bytes[0])
			xs.set(0, true)
			assert.equal(3, xs.bytes[0])
		})
	})

	describe('get', () => {
		const xs = new BitArray(32)
		xs.set(0, true)
		xs.set(7, true)
		xs.set(12, true)

		it('should get true bits', () => {
			assert.equal(true, xs.get(0))
			assert.equal(true, xs.get(7))
			assert.equal(true, xs.get(12))
		})

		it('should get false bits', () => {
			for (let i = 0; i < 32; i++)
				if (i !== 0 && i !== 7 && i !== 12)
					assert.equal(false, xs.get(i))
		})
	})

	test('forEach', () => {
		const xs = new BitArray(32)
		xs.set(0, true)
		xs.set(7, true)
		xs.set(12, true)
		let i = 0
		xs.forEach((enabled, index) => {
			i++
			switch (index) {
				case 0:
				case 7:
				case 12:
					assert.equal(true, enabled)
					break
				default:
					assert.equal(false, enabled)
					break
			}
		})
		assert.equal(i, 32)
	})
})
