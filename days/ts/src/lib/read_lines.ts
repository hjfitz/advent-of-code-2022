import {readFileSync} from 'node:fs'

export function readLines(src: string): string[] {
	const raw = readFileSync(src)
	const str = raw.toString()
	return str.trim().split('\n')
}
