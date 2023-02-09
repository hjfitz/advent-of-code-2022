import { readFileSync } from "fs";
import path from "path";

class FileNode {
	constructor(
		public readonly name: string,
		public readonly size: number,
	){}
}


class FolderNode {
	public children: FilesystemObject[] = []
	constructor(
		public readonly name: string,
		public readonly parent: FolderNode | null,
	){}

	public getSize(): number {
		let total = 0;
		for (const child of this.children) {
			if (child instanceof FileNode) {
				total += child.size
			} else {
				total += child.getSize()
			}
		}
		return total
	}

}

type FilesystemObject = FileNode | FolderNode

class State {
	public root: FolderNode | null = null
	constructor(
		public cwd: FolderNode | null
	){}
}

function buildFilesystem(input: string): State {
	const commandsRun = input.split('\n$').map(line => line.replace(/^\$/, '').trim())
	const state = new State(null)
	for (const line of commandsRun) {
		const [, dirTo] = line.split(' ')
		const command = line.substring(0, 2)
		if (command === 'ls') {
			if (!state.cwd) {
				throw new Error('Unknown dir')
			}
			const contents = line.substring(2).trim().split('\n')
			updateChildren(contents, state.cwd as FolderNode)
		} else if (command === 'cd') {
			changeDir(dirTo, state)
		}
	}
	return state
}

function updateChildren(contents: string[], node: FolderNode) {
	const children = contents.map(child => {
		const [ident, name] = child.split(' ')
		if (ident === 'dir') {
			return new FolderNode(name, node)
		} else {
			return new FileNode(name, parseInt(ident, 10))
		}
	})
	node.children = children
}

function changeDir(to: string, state: State) {
	switch (to) {
		case '/': {
			// if there's no state.cwd, create it
			if (!state.cwd) {
				const rootNode = new FolderNode('/', null)
				state.root = state.cwd = rootNode
			}
			break
		}
		case '..': {
			// go to state.cwd.parent
			state.cwd = state.cwd!.parent
			break
		}
		default: {
			// find in state.cwd.children and set  state.cwd ===
			const child = state.cwd!.children.find(c => c.name === to)
			if (!child) {
				throw new Error('unable to file child')
			}
			if (child instanceof FileNode) {
				throw new Error('Unable to change directory to a file')
			}
			state.cwd = child
		}
	}
}

function* graphToList(node: FolderNode): Generator<FolderNode> {
	for (const child of node.children) {
		if (child instanceof FolderNode) {
			yield child
			yield* graphToList(child)
		}
	}
}

function partOne(input: string) {
	const filesystem = buildFilesystem(input)
	const folders = [...graphToList(filesystem.root!)] 
	const size = folders.map(f => f.getSize()).filter(s => s <= 100000).reduce((a, b) => a + b)
	console.log('Part one:', size)
}

function partTwo(input: string) {
	const TOTAL_SPACE = 70000000
	const UPDATE_SIZE = 30000000
	const filesystem = buildFilesystem(input)
	const folders = [...graphToList(filesystem.root!)] as FolderNode[]
	const remainingSpace = TOTAL_SPACE - (filesystem?.root?.getSize() ?? 0)
	const spaceNeeded = UPDATE_SIZE - remainingSpace
	const applicableFolders = folders.map(f => f.getSize()).filter(f => f >= spaceNeeded).sort((a, b) => a - b)
	console.log('Part two:', applicableFolders[0])
}

const data = readFileSync(path.join(process.cwd(), 'src/inputs/day7')).toString()

partOne(data)
partTwo(data)
