import { readFileSync } from "fs"
import path from "path"
import { filter, flatten, join, map, split, takeLast } from "ramda"
import { isTruthy, toNumber } from "ramda-adjunct"

const isEmpty = (str: string) => isTruthy(str?.trim())

const toNumbers = (line: string) => map(toNumber, filter(isTruthy, split(/[^0-9]/, line)))
function parseInstructions(instructionLines: string): number[][] {
	return map(toNumbers, split('\n', instructionLines))
}

function pull<T>(count: number, from: T[]) {
	const ret = []
	for (let i = 0; i < count; i++) {
		ret.push(from.pop())
	}
	return filter(isTruthy, ret)
}


function parseStacks(stacksStr: string): string[][] {
	const stackLines = stacksStr.split('\n')
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

	const sanit = map(filter(isEmpty), stacks)
	return sanit
}
export function partOne(input: string): string {
	const [stacksStr, instructionsStr]  = input.split('\n\n')
	const stacks = parseStacks(stacksStr)
	const instructions = parseInstructions(instructionsStr)
	for (const [moveCount, from, to] of instructions) {
		const toMove = pull(moveCount, stacks[from - 1]) as string[]
		stacks[to - 1].push(...toMove)
	}

	return join('', flatten(map(takeLast(1), stacks)))
}

function main() {
	const inFile = path.join(process.cwd(), 'src/inputs/day5')
	const inRaw = readFileSync(inFile)
	const input = inRaw.toString()
	const partOneResult = partOne(input.trim())
	console.log('Day 1:', partOneResult)
}

// don't do this in prod, kids
if (process.env.NODE_ENV !== 'test') {
	main()
}



