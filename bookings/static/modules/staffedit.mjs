

import { StaffAvilabilityEditor } from "./staffAvilabilityEditor.mjs"

export class StaffEditor {

	constructor (root) {
		this.root = root
		this.body = root.querySelector(".body")
		fetch ("/staff")
			.then (resp => resp.json())
			.then (staff => this.populate(staff))
	}

	populate (staff) {
		let template = this.root.querySelector ("template#staffList")
		let copy = template.content.cloneNode(true)
		let select = copy.querySelector("select")
		for (let s of staff) {
			let username = s.username
			let e = document.createElement ("option")
			e.setAttribute("value", username)
			e.textContent = username
			select.appendChild(e)
		}
		select.addEventListener ('change', () => {
			this.editUser(select.value)
		})
		this.root.querySelector(".head").appendChild(copy)
		this.editUser (staff[0].username)
	}


	editUser (username) {
		if (!username)
			throw new Error ("No user.")
		let template = this.root.querySelector("template#availabilitySchedule")
		let editor = template.content.cloneNode(true)
		new StaffAvilabilityEditor (username, editor)
		this.body.replaceChildren (editor)
	}

}


var root = document.querySelector("#staffEditor")

console.log ("Hello from staff editor.")