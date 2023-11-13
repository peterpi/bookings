export class ServiceEditor
{



	constructor (root) {
		if (!root)
			throw new Error ()
		this.root = root
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


}
