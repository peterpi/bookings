export class ServiceEditor
{



	constructor (root, divStack) {
		if (!root)
			throw new Error ()
		this.root = root

		fetch ("/services")
			.then (resp => resp.json())
			.then (services => this.populate(services, divStack))
	}

	populate (services, divStack)
	{
		let template = this.root.querySelector("template#servicesList")
		let servicesList = template.content.cloneNode(true)
		let table = servicesList.querySelector("table")
		let rowTemplate = servicesList.querySelector("template#serviceTemplate")

		for (const s of services) {
			const row = rowTemplate.content.cloneNode(true)
			const tag = s.tag
			const serviceName = s.name
			row.querySelector(".serviceName > input").value = serviceName
			row.querySelector(".serviceDelete").addEventListener('click', () => this.deleteService (serviceName))
			const edit = row.querySelector("input.serviceEdit")
			edit.addEventListener('click', () => this.editService (tag, divStack))
			table.appendChild (row)
		}

		servicesList.querySelector("#newService > .submit").addEventListener('click', () => {
			this.newService()
		})
		divStack.push(servicesList)
	}

	async editService (tag, divStack) {
		console.log (`"Edit ${tag}`)
		const service = await fetch (`/services/${tag}`).then (resp => resp.json())
		console.log (`Hello ${service}`)
	}

	async newService () {
		console.log ("New")
		const details = this.root.querySelector("#newService")
		const tag = details.querySelector("#newServiceTag").value
		const name = details.querySelector("#newServiceName").value
		const duration = details.querySelector("#newServiceDuration").value
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
