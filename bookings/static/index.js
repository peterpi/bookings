

import { DivStack } from "./modules/DivStack.mjs"
import { ServiceEditor } from "./modules/ServiceEditor.mjs"
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
	body.replaceChildren()
	body.textContent = "Loading"
	fetch ("./serviceEditor.html")
		.then (resp => resp.text())
		.then (text => {
			var doc = new DOMParser().parseFromString(text, 'text/html')
			var editor = doc.querySelector("body > div")
			if (!editor)
				throw new Error ("Failed to locate editor.")
				new ServiceEditor (editor, divStack)
			divStack.push(editor)
		})
})