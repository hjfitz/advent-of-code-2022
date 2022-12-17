import {isTruthy, toNumber} from 'ramda-adjunct'
import {takeLast, join, flatten, map, filter, split} from 'ramda'

export const isEmpty = (str: string) => isTruthy(str?.trim())
export const peek = takeLast(1)
export const joinLines = join('')
export const clone = <T,>(arr: T[]): T[] => ([...arr])
export const peekStacks = (stacks: string[][]) => joinLines(flatten(map(peek, stacks)))
export const toNumbers = (line: string) => map(toNumber, filter(isTruthy, split(/[^0-9]/, line)))
export const removeEmpty = filter(isEmpty)
export const splitLines = split('\n')
