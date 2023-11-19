import {ServiceEditor} from "./ServiceEditor.mjs"

export class ServiceList
{



	constructor (root, divStack) {
		if (!root)
			throw new Error ()

		fetch ("/services")
			.then (resp => resp.json())
			.then (services => this.populate(root, services, divStack))
	}

	populate (root, services, divStack)
	{
		let table = root.querySelector("table")
		let rowTemplate = table.querySelector("#serviceTemplate")

		for (const s of services) {
			const row = rowTemplate.content.cloneNode(true)
			const tag = s.tag
			const serviceName = s.name
			row.querySelector(".serviceName").textContent = s.name
			row.querySelector(".serviceDelete").addEventListener('click', () => this.deleteService (serviceName))
			const edit = row.querySelector("input.serviceEdit")
			edit.addEventListener('click', () => this.editService (root, tag, divStack))
			table.appendChild (row)
		}

		const newService = root.querySelector("#newService")
		newService.querySelector ('input[type="button"]').addEventListener('click', () => {
				this.makeNewService(newService)
			})
		divStack.push(root)
	}

	async editService (root, tag, divstack) {
		console.log (`"Edit ${tag}`)
		let editor = await fetch ("./serviceEditor.html")
			.then (resp => resp.text())
			.then (text => new DOMParser().parseFromString(text, "text/html"))
		editor = editor.querySelector("div")
		new ServiceEditor (tag, editor, divstack)
	}

	async makeNewService (newService) {
		console.log ("New")
		const tag = newService.querySelector("#newServiceTag").value
		const name = newService.querySelector("#newServiceName").value
		const duration = newService.querySelector("#newServiceDuration").value
		const j = {
			tag: tag,
			name: name,
			duration: duration
		}
		const resp = await fetch ("/services", {
			method: "POST",
			headers : {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(j)
		})
	}


}
