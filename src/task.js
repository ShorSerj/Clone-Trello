import {
    Send
} from "./sendBack"
import {
    Column
} from "./column"


const axios = require('axios').default

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
        taskEdit.setAttribute('tabindex', 0)
        taskEdit.classList.add("task-text", "edit")
        taskEdit.innerHTML = content

        taskElement.oncontextmenu = function () {
            return false
        };
        Task.contextMenu(taskElement, taskEdit)

        const taskDeadLine = document.createElement("div")
        taskElement.append(taskEdit)
        taskElement.append(taskDeadLine)
        if (!id) {
            Task.idCounter++
        }

        Task.addDragnDropEvent(taskElement)

        return taskElement
    },

    contextMenu(taskElement, taskEdit) {
        const taskContextMenu = document.createElement('nav')
        taskContextMenu.classList.add('taskMenu')
        taskContextMenu.setAttribute('tabindex', 0)

        const contextContainer = document.createElement('ul')
        contextContainer.classList.add('contextTaskMenu__items')

        //Button Edit
        const contextEdit = document.createElement('li')
        contextEdit.classList.add('contextTaskMenu__item')

        const contextEditButton = document.createElement('span')
        contextEditButton.classList.add('contextTaskMenu__link')
        contextEditButton.innerHTML = 'Edit Task'

        const contextEditButtonImg = document.createElement('i')
        contextEditButtonImg.classList.add('fa')
        contextEditButtonImg.classList.add('fa-edit')

        contextEditButton.prepend(contextEditButtonImg)
        contextEdit.append(contextEditButton)
        contextContainer.append(contextEdit)
        taskContextMenu.append(contextContainer)

        contextEditButton.addEventListener('click', () => {
            taskEdit.setAttribute('contenteditable', true)
            taskEdit.focus()
            let firstText = taskEdit.innerHTML

            const eventBlur = function () {
                if (taskEdit.innerHTML.length < 1) {
                    taskElement.remove()
                }
                taskEdit.removeAttribute('contenteditable')
                if (taskEdit.innerHTML !== firstText) {
                    Task.saveTask(taskEdit)
                    taskEdit.removeEventListener("blur", eventBlur)
                }
            }
            taskEdit.addEventListener("blur", eventBlur)
        })
        // \Button Edit

        // Button Delete
        const contextDel = document.createElement('li')
        contextDel.classList.add('contextTaskMenu__item')

        const contextDelButton = document.createElement('span')
        contextDelButton.classList.add('contextTaskMenu__link')
        contextDelButton.innerHTML = 'Delete Task'

        const contextDelButtonImg = document.createElement('i')
        contextDelButtonImg.classList.add('fa')
        contextDelButtonImg.classList.add('fa-times')

        contextDelButton.prepend(contextDelButtonImg)
        contextDel.append(contextDelButton)
        contextContainer.append(contextDel)

        contextDelButton.addEventListener('click', (event) => {
            taskElement.remove()
            let parents = event.composedPath()
            Task.deleteTask(taskElement, parents[6])
        })
        // \Button Delete

        taskElement.addEventListener('contextmenu', (event) => {
            taskContextMenu.style.display = 'inline'
            taskContextMenu.focus()

            taskContextMenu.addEventListener("blur", () => {
                taskContextMenu.style.display = 'none'
            })
        })
        taskElement.append(taskContextMenu)
    },

    addTask(element, parentElement) {
        let taskNew = element.querySelector('.edit')
        taskNew.setAttribute('contenteditable', true)
        taskNew.focus()

        let eventBlur = function () {
            if (taskNew.innerHTML.length < 1 && taskNew.closest(".task")) {
                taskNew.closest(".task").remove()
            } else {
                taskNew.removeAttribute('contenteditable')
                taskNew.removeEventListener("blur", eventBlur)
            }
        }
        taskNew.addEventListener("blur", eventBlur)
        return taskNew
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
        event.stopPropagation()
        this.classList.add("dragElement")
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
                console.log('yes')
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