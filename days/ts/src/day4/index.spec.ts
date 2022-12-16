import path from 'node:path'
import {lineToNumbers, partOne, partTwo} from '.'
import {readLines} from '../lib/read_lines'

const AOC_DUMMY_DATA = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
]

describe('day 4', () => {
	describe('utils', () => {

		describe('lineToNumbers', () => {

			it('should split a string of numbers and letters in to numbers', () => {
				expect(lineToNumbers('1,2-2,4')).toStrictEqual([[1,2],[2,4]])
			})

		})

	})
	describe('part 1', () => {

		it('should pass with the dummy input', () => {
			expect(partOne(AOC_DUMMY_DATA)).toBe(2)
		})

		it('should pass with the official inputs', () => {
			const input = readLines(path.join(process.cwd(), 'src/inputs/day4'))
			const answer = partOne(input)
			console.log('part one answer:', answer)
			expect(answer).toBe(550)
		})

	})

	describe('part 2', () => {
		it('should pass with dummy input', () => {
			expect(partTwo(AOC_DUMMY_DATA)).toBe(4)
		})

		it('should pass with the official inputs', () => {
			const input = readLines(path.join(process.cwd(), 'src/inputs/day4'))
			const answer = partTwo(input)
			console.log('part two answer:', answer)
			expect(answer).toBe(931)
		})

	})
})
