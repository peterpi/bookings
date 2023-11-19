


export class ServiceEditor{

	constructor (tag, root, divstack)
	{
		this.tag = tag
		this.root = root
		fetch (`/services/${tag}`)
			.then (resp => resp.json())
			.then (service => this.populate(service, root, divstack))
	}

	populate (service, root, divstack) {
		this.name = root.querySelector("#inputServiceName > input")
		this.duration = root.querySelector("#inputServiceDuration > input")

		const onChange = () => this.putAndRefresh (service.tag)

		this.name.addEventListener("change", onChange)
		this.duration.addEventListener ("change", onChange)

		this.refresh (service)

		root.querySelector("#serviceEditorBack").addEventListener('click', () => {
			divstack.pop()
		})
		divstack.push(root)
	}

	async putAndRefresh () {
		const name = this.name.value
		const duration = this.duration.value
		const j = {
			"name" : this.name.value,
			"duration" : this.duration.value
		}
		const service = await fetch (`/services/${this.tag}`, {
			"method" : "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(j),
		}).then (resp => resp.json())
		this.refresh (service)
	}

	refresh (service) {
		this.name.value = service.name
		this.duration.value = service.duration
	}
}