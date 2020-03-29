import {
    Send
} from "./sendBack"
const Task = {
    idCounter: 10,
    darggbleTask: null,

    create(id = null, content = "") {
        let idCounter = id
        if (!id) {
            idCounter = Task.idCounter
        }
        const taskElement = document.createElement('div')
        taskElement.classList.add('task')
        taskElement.setAttribute('data-task-id', idCounter)
        taskElement.setAttribute('draggable', 'true')
        const taskEdit = document.createElement("div")
        taskEdit.setAttribute('tabindex', 1)
        taskEdit.classList.add("task-text", "edit")
        taskEdit.innerHTML = content

        taskEdit.setAttribute('contenteditable', true)
        // TODO: доработать функционал фокуса
        taskEdit.focus()

        taskEdit.addEventListener("blur", () => {
            if (taskEdit.innerHTML.length < 1 && taskEdit.closest(".task")) {
                taskEdit.closest(".task").remove()
            }

            taskEdit.removeAttribute('contenteditable')

        })

        const taskDeadLine = document.createElement("div")
        taskElement.append(taskEdit)
        taskElement.append(taskDeadLine)
        if (!id) {
            Task.idCounter++
        }
        Task.addDragnDropEvent(taskElement)
        Task.editValue(taskEdit)
        return taskElement
    },

    findIdTask(idTasks) {
        let id = 1
        idTasks.forEach((elem) => {
            let idThisTask = elem.getAttribute('data-task-id')
            if (Number(idThisTask) > id) {
                id = idThisTask
            }
        })
        id++
        return id
    },

    editValue(element) {
        let firstTextTask
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            element.focus()
            firstTextTask = element.innerHTML
        })
        element.addEventListener("blur", () => {
            if (element.innerHTML.length < 1 && element.closest(".task")) {
                element.closest(".task").remove()
            }

            element.removeAttribute('contenteditable')
            if (firstTextTask !== element.innerHTML) {
                Task.saveTask(element)
            }
        })
    },

    saveTask(element) {
        const body = {
            idParent: element.closest('.column').getAttribute('data-column-id'),
            text: element.innerHTML
        }
        const id = element.parentElement.getAttribute('data-task-id')

        if (id) {
            body.id = id
        }
        Send.sendToBack("http://localhost:8000/fixTitleTask", body, "POST")
    },

    addDragnDropEvent(chooseTask) {
        chooseTask.setAttribute('draggable', true)
        chooseTask.addEventListener("dragstart", Task.evenDragStartTask)
        chooseTask.addEventListener("dragend", Task.evenDragEndTask)
        chooseTask.addEventListener("dragenter", Task.evenDragEnterTask)
        chooseTask.addEventListener("dragover", Task.evenDragOverTask)
        chooseTask.addEventListener("dragleave", Task.evenDragLeaveTask)
        chooseTask.addEventListener("drop", Task.evenDragDropTask)
    },

    evenDragStartTask(event) {
        console.log(this.innerHTML)
        event.stopPropagation()
        this.classList.add("dragElement")
        console.log(this.outerHTML)
        Task.darggbleTask = this
    },

    evenDragEndTask(event) {
        event.stopPropagation()
        this.classList.remove("dragElement")
        Task.darggbleTask = null
    },

    evenDragEnterTask(event) {
        event.stopPropagation()
    },

    evenDragOverTask(event) {
        event.preventDefault()
        event.stopPropagation()
    },

    evenDragLeaveTask(event) {
        event.stopPropagation()
    },

    evenDragDropTask(event) {
        event.preventDefault()
        event.stopPropagation()
        if (Task.darggbleTask !== this) {
            if (this.parentElement === Task.darggbleTask.parentElement) {
                const parentElements = Array.from(this.parentElement.querySelectorAll(".task"))
                const x = parentElements.indexOf(this)
                const y = parentElements.indexOf(Task.darggbleTask)
                if (x < y) {
                    this.parentElement.insertBefore(Task.darggbleTask, this)
                } else {
                    this.parentElement.insertBefore(Task.darggbleTask, this.nextElementSibling)
                }
            } else {
                this.parentElement.insertBefore(Task.darggbleTask, this)
            }
        }
    },
}

export {
    Task
}