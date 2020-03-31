import {
    Task
} from "./task"
import {
    Send
} from "./sendBack"
const axios = require('axios').default;

const Column = {
    idCounter: 4,
    darggbleColumn: null,

    create(id = null, title = "") {
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
        columnTitle.setAttribute('tabindex', 0)
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

    addColumn(element) {
        let ColumnNew = element.querySelector('.edit')
        ColumnNew.setAttribute('contenteditable', true)
        ColumnNew.focus()

        ColumnNew.addEventListener("blur", () => {
            if (ColumnNew.innerHTML.length < 1 && ColumnNew.closest(".task")) {
                ColumnNew.closest(".task").remove()
            }
            ColumnNew.removeAttribute('contenteditable')
        })
        return ColumnNew
    },

    findIdColumn(idTasks) {
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
            if (element.innerHTML.length < 1 && element.closest(".column")) {
                element.closest(".column").remove()
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
        // console.log('body', body)
        // Send.sendToBack("http://localhost:8000/fixTitleColumn", body, "POST")
        axios.post('/fixTitleColumn', body)
            .then(function (response) {
                console.log('element fixed',response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    },

    eventAddTask(columnElement) {
        let buttonAddTask = columnElement.querySelector(".add-task")
        buttonAddTask.addEventListener('click', function () {
            let idTasks = document.querySelectorAll('.task')
            let id = Task.findIdTask(idTasks)
            let taskNew = Task.create(id)
            columnElement.querySelector('.list-tasks').append(taskNew)
            Task.addTask(taskNew)
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
                    console.log(JSON.stringify(this.parentElement))
                    
                    this.parentElement.insertBefore(Column.darggbleColumn, this)
                }

            }
        } else if (Task.darggbleTask) {
            console.log(Task.darggbleTask)
            this.querySelector(".list-tasks").append(Task.darggbleTask)
        }
    }
}

export {
    Column
}