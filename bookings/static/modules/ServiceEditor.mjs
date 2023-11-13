export class ServiceEditor
{



	constructor (root) {
		if (!root)
			throw new Error ()
		this.root = root

		root.querySelector("#newService > .submit").addEventListener('click', () => {
			this.newService()
		})

		fetch ("/services")
			.then (resp => resp.json())
			.then (services => this.populate(services))
	}

	populate (services)
	{
		let rows = this.root.querySelector("#serviceRows")
		let template = this.root.querySelector("template#serviceTemplate")

		for (const s of services) {
			const row = template.content.cloneNode(true)
			const serviceName = s.name
			row.querySelector(".serviceName").textContent = serviceName
			row.querySelector(".delete").addEventListener('click', () => this.deleteService (serviceName))
			rows.appendChild (row)
		}
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
