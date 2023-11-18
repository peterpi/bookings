

export class DivStack {

	constructor (root) {
		this.root = root;
		this.stack = []
	}

	pop () {
		const num = this.stack.length
		const removee = this.stack[num-1]
		this.stack.splice(num-1, 1)
		const last = this.stack[num-2]
		this.root.removeChild(removee)
		last.style.display = "initial"
	}

	push (div) {
		if (!div)
			throw new Error ("Cannot push undefined value.")
		const len = this.stack.length
		if (len > 0) {
			const last = this.stack[len-1]
			last.style.display = "none"
		}
		this.stack[len] = div
		this.root.appendChild(div)
	}
}