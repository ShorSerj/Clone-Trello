import {
    Task
} from "./task"
import {
    Send
} from "./sendBack"


const Column = {
    idCounter: 4,
    darggbleColumn: null,

    create(id = null, title = "Done") {
        let idCounter = id
        if (!id) {
            idCounter = Column.idCounter
        }
        const columnNewElement = document.createElement('div')
        columnNewElement.classList.add('column')
        columnNewElement.setAttribute('data-column-id', idCounter)
        columnNewElement.setAttribute('draggable', true)

        const columnHead = document.createElement("div")
        columnHead.classList.add("column-header")

        const columnTitle = document.createElement("div")
        columnTitle.classList.add("title", "edit")
        columnTitle.innerHTML = title

        const actionList = document.createElement("span")
        actionList.classList.add("list-actions")
        actionList.innerHTML = `<span>...</span>`

        const listTask = document.createElement("div")
        listTask.classList.add("list-tasks")

        const addTask = document.createElement("button")
        addTask.classList.add("add-task")
        addTask.innerHTML = `Добавить задачу`

        columnHead.append(columnTitle)
        columnHead.append(actionList)

        columnNewElement.append(columnHead)
        columnNewElement.append(listTask)
        columnNewElement.append(addTask)

        Column.eventAddTask(columnNewElement)
        Column.editValue(columnTitle)

        if (!id) {
            Column.idCounter++
        }


        return columnNewElement

    },

    findIdColumn() {
        let idTasks = document.querySelectorAll('.column')
        let id = 1
        idTasks.forEach((elem) => {
            let idThisTask = elem.getAttribute('data-column-id')
            if (Number(idThisTask) > id) {
                id = idThisTask
            }
        })
        id++
        return id
    },
    editValue(element) {
        let firstText
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            element.focus()
            firstText = element.innerHTML
        })
        element.addEventListener("blur", () => {
            if (element.innerHTML.length < 1 && element.closest(".task")) {
                element.closest(".task").remove()
            }
            element.removeAttribute('contenteditable')
            if (firstText !== element.innerHTML) {
                Column.saveColumn(element)
            }
        })
    },

    saveColumn(element) {
        const body = {
            idParent: element.closest('.column').getAttribute('data-column-id'),
            text: element.innerHTML
        }
        const id = element.parentElement.getAttribute('data-task-id')
        if (id) {
            body.id = id
        }
        Send.sendToBack("http://localhost:8000/fixTitleColumn", body, "POST")
    },

    eventAddTask(columnElement) {
        let buttonAddTask = columnElement.querySelector(".add-task")
        buttonAddTask.addEventListener('click', function () {
            let id = Task.findIdTask()
            console.log(id)
            columnElement.querySelector('.list-tasks').append(Task.create(id))
        })
        Column.addDragnDropEventColums(columnElement)
    },

    addDragnDropEventColums(columnElement) {
        columnElement.setAttribute('draggable', true)
        columnElement.addEventListener("dragstart", Column.evenDragStartColumn)
        columnElement.addEventListener("dragend", Column.evenDragEndColumn)
        columnElement.addEventListener("dragenter", Column.evenDragEnterColumn)
        columnElement.addEventListener("dragover", Column.evenDragOverColumn)
        columnElement.addEventListener("dragleave", Column.evenDragLeaveColumn)
        columnElement.addEventListener("drop", Column.evenDragDropColumn)
    },

    evenDragStartColumn() {
        this.classList.add("dragElement")
        Column.darggbleColumn = this
    },

    evenDragEndColumn() {
        this.classList.remove("dragElement")
        Column.darggbleColumn = null
    },

    evenDragEnterColumn(event) {
        event.stopPropagation()
    },

    evenDragOverColumn(event) {
        event.preventDefault()
        event.stopPropagation()
    },

    evenDragLeaveColumn(event) {
        event.stopPropagation()
    },

    evenDragDropColumn(event) {
        event.preventDefault()
        event.stopPropagation()
        if (Column.darggbleColumn) {
            if (Column.darggbleColumn !== this && Column.darggbleColumn) {
                if (this.parentElement === Column.darggbleColumn.parentElement) {
                    const parentElements = Array.from(this.parentElement.querySelectorAll(".column"))
                    const x = parentElements.indexOf(this)
                    const y = parentElements.indexOf(Column.darggbleColumn)
                    if (x < y) {
                        this.parentElement.insertBefore(Column.darggbleColumn, this)
                    } else {
                        this.parentElement.insertBefore(Column.darggbleColumn, this.nextElementSibling)
                    }
                } else {
                    this.parentElement.insertBefore(Column.darggbleColumn, this)
                }

            }
        } else if (Task.darggbleTask) {
            this.querySelector(".list-tasks").append(Task.darggbleTask)
        }
    }
}

export {
    Column
}