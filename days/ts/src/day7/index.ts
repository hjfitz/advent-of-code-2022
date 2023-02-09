import { readFileSync } from "fs";
import path from "path";

interface FSNode {
	name: string
	size: number
}

class FileNode implements FSNode {
	constructor(
		public readonly name: string,
		public readonly size: number,
	){}
}

class RootNode implements FSNode {
	public children: FSNode[] = []
	public name = '/'

	public get size(): number {
		let total = 0;
		for (const child of this.children) {
			total += child.size
		}
		return total
	}

}

class FolderNode extends RootNode {
	constructor(
		public name: string,
		public readonly parent: FolderNode,
	) {
		super()
	}
}

class State {
	public cwd: RootNode | FolderNode
	constructor(
		public root: RootNode
	){
		this.cwd = root
	}
}

function buildFilesystem(input: string): State {
	const commandsRun = input.split('\n$').map(line => line.replace(/^\$/, '').trim())
	const state = new State(new RootNode())
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
				const rootNode = new FolderNode('/', state.cwd)
				state.root = state.cwd = rootNode
			}
			break
		}
		case '..': {
			if (state.cwd instanceof FolderNode) {
				state.cwd = state.cwd.parent
				break
			}
			// go to state.cwd.parent
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
			if (child instanceof RootNode || child instanceof FolderNode) {
				state.cwd = child
			}
		}
	}
}

function* graphToList(node: FolderNode | RootNode): Generator<FolderNode> {
	for (const child of node.children) {
		if (child instanceof FolderNode) {
			yield child
			yield* graphToList(child)
		}
	}
}

function partOne(input: string) {
	const filesystem = buildFilesystem(input)
	const folders = [...graphToList(filesystem.root)] 
	const size = folders.map(f => f.size).filter(s => s <= 100000).reduce((a, b) => a + b)
	console.log('Part one:', size)
}

function partTwo(input: string) {
	const TOTAL_SPACE = 70000000
	const UPDATE_SIZE = 30000000
	const filesystem = buildFilesystem(input)
	const folders = [...graphToList(filesystem.root)] as FolderNode[]
	const remainingSpace = TOTAL_SPACE - (filesystem.root.size ?? 0)
	const spaceNeeded = UPDATE_SIZE - remainingSpace
	const applicableFolders = folders.map(f => f.size).filter(f => f >= spaceNeeded).sort((a, b) => a - b)
	console.log('Part two:', applicableFolders[0])
}

const data = readFileSync(path.join(process.cwd(), 'src/inputs/day7')).toString()

partOne(data)
partTwo(data)
