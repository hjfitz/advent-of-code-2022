import {readFileSync} from 'fs'
import path from 'path'
import {clone, filter, map, split} from 'ramda'
import {isTruthy, toNumber} from 'ramda-adjunct'
import {peekStacks, removeEmpty, splitLines, toNumbers} from '../lib/funcs'


function parseInstructions(instructionLines: string): number[][] {
	return map(toNumbers, splitLines(instructionLines))
}

function pull<T>(count: number, from: T[]) {
	const ret = []
	for (let i = 0; i < count; i++) {
		ret.push(from.pop())
	}
	return filter(isTruthy, ret)
}


function parseStacks(stacksStr: string): string[][] {
	const stackLines = splitLines(stacksStr)
	const stackHeadersRaw = stackLines.pop() as string
	const stackHeaders = map(toNumber, filter(isTruthy, split(/\s/, stackHeadersRaw)))
	const totalStacks = stackHeaders.pop() ?? 0
	const stacks: string[][] = Array.from({length: totalStacks}, () => [])
	for (const line of stackLines) {
		for (let i = 1; i < stackHeadersRaw.length; i += 4) {
			const stackIdx = ((i + 3) / 4) - 1
			const curStack = stacks[stackIdx]
			const char = line[i]
			curStack.unshift(char)
		}
	}

	return map(removeEmpty, stacks)
}
export function partOne(stacks: string[][], instructions: number[][]): string {
	for (const [moveCount, from, to] of instructions) {
		const toMove = pull(moveCount, stacks[from - 1]) as string[]
		stacks[to - 1].push(...toMove)
	}

	return peekStacks(stacks)
}

function partTwo(stacks: string[][], instructions: number[][]): string {
	for (const [moveCount, from, to] of instructions) {
		const toMove = pull(moveCount, stacks[from - 1]) as string[]
		stacks[to - 1].push(...toMove.reverse())
	}
	return peekStacks(stacks)
}

function main() {
	const inFile = path.join(process.cwd(), 'src/inputs/day5')
	const inRaw = readFileSync(inFile)
	const input = inRaw.toString().trimEnd()
	const [rawStacks, rawInstructions] = input.split('\n\n')
	const stacks = parseStacks(rawStacks)
	const instructions = parseInstructions(rawInstructions)

	const partOneResult = partOne(clone(stacks), clone(instructions))
	const partTwoResult = partTwo(clone(stacks), clone(instructions))
	console.log('Day 1:', partOneResult)
	console.log('Day 2:', partTwoResult)
}

// don't do this in prod, kids
if (process.env.NODE_ENV !== 'test') {
	main()
}

