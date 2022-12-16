import {filter, map, range, splitEvery} from 'ramda'
import {isTruthy} from 'ramda-adjunct'

export function arrToRange(arr: number[]) {
	const end = (arr?.[1] ?? arr[0]) + 1
	return range(arr[0], end)
}

export function lineToNumbers(line: string): number[][] {
	const numbers = line.split(/[^0-9]/).map(char => parseInt(char, 10))
	return splitEvery(2, numbers)
}

export function pairToRange(line: number[][]): number[][] {
	return map(arrToRange, line)
}

export function parseInput(input: string[]): number[][][]  {
	return map(lineToNumbers, input)
}

export function leftContains(pairA: number[], pairB: number[]): boolean {
	return (pairA[0] <= pairB[0]) && (pairA[1] >= pairB[1])
}

export function eitherContains(pairA: number[], pairB: number[]): boolean {
	return leftContains(pairA, pairB) || leftContains(pairB, pairA)
}

export function partOne(input: string[]): number {
	const ranges = parseInput(input)
	const containsMatches = ranges.map(range => eitherContains(range[0], range[1]))
	const withContains = filter(isTruthy, containsMatches)
	return withContains.length
}

export function hasIntersection(sets: number[][]): boolean {
	const [setA, setB] = sets
	const set = new Set([...setA, ...setB])
	return set.size < (setA.length + setB.length)
}

export function partTwo(input: string[]): number {
	const rangesRaw = parseInput(input)
	const ranges = map(pairToRange, rangesRaw)
	const intersections = filter(hasIntersection, ranges)
	return intersections.length
}
