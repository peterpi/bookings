

export class StaffAvilabilityEditor
{
	constructor (username, root) {
		this.username = username
		this.rows = root.querySelector(".rows")
		this.rowTemplate = root.querySelector("template#availabilityScheduleRow")

		fetch (`/staff/${username}/availability_schedule`)
			.then (resp => resp.json())
			.then (availability => this.populate (availability))
	}

	populate (availability) {
		for (let a of availability) {
			let row = this.rowTemplate.content.cloneNode(true)
			row.querySelector(".start").value = a.start
			this.rows.appendChild(row)
		}
		console.log ("got it.")
	}
}