

import { DivStack } from "./modules/DivStack.mjs"
import { ServiceList } from "./modules/ServiceList.mjs"
import {StaffEditor} from "./modules/staffedit.mjs"


var body = document.querySelector("#body")

var staffEdit = document.querySelector("#top > #launchStaffEditor")

const divStack = new DivStack (body)

staffEdit.addEventListener ("click", () => {
	console.log("Hello")
	body.replaceChildren()
	fetch ("./staffedit.html")
		.then(response => response.text())
		.then (text => {
			var editorDoc = new DOMParser().parseFromString(text, "text/html")
			var editor = editorDoc.querySelector("#staffEditor")
			new StaffEditor (editor)
			divStack.push(editor)
		})
})

let services = document.querySelector("#launchServiceEditor")
services.addEventListener('click', () => {
	fetch ("./serviceList.html")
		.then (resp => resp.text())
		.then (text => {
			var doc = new DOMParser().parseFromString(text, 'text/html')
			var serviceList = doc.querySelector("#servicesList")
			if (!serviceList)
				throw new Error ("Failed to locate editor.")
			new ServiceList (serviceList, divStack)
		})
})