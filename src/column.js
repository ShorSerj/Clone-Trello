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

        const actionList = document.createElement("i")
        actionList.classList.add("list-actions")
        actionList.classList.add("fas")
        actionList.classList.add("fa-ellipsis-h")

        Column.contextMenu(actionList)

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
        let columnNew = element.querySelector('.edit')
        columnNew.setAttribute('contenteditable', true)

        columnNew.focus()

        columnNew.addEventListener("blur", () => {
            if (columnNew.innerHTML.length < 1 && columnNew.closest(".task")) {
                columnNew.closest(".task").remove()
            }
            columnNew.removeAttribute('contenteditable')
        })
        return columnNew
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

//TODO пересмотреть логику contextMenu и разбить по модулям
    contextMenu(actionList) {
        actionList.addEventListener('click', (element) => {
            let contextMenu = document.querySelector('.columnMenu')
            let editColumnMenu = document.querySelector('.editColumn')
            let deleteColumnMenu = document.querySelector('.deleteColumn')   

            contextMenu.style.display = 'inline'
            let left = element.x;
            let top = element.y;
            contextMenu.style.left = left + "px";
            contextMenu.style.top = top + "px";
            contextMenu.focus()

            contextMenu.addEventListener("blur", () => {
                contextMenu.style.display = 'none'
            })

            editColumnMenu.addEventListener('click', () => {
                let editColumn = actionList.parentElement.querySelector('.edit')
                let event = new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                editColumn.dispatchEvent(event)
            })

            deleteColumnMenu.addEventListener('click', () => { 
                let editColumn = actionList.closest('.column')
                Column.deleteElement(editColumn)
                editColumn.remove()
                contextMenu.blur()
            })
        })
    },

    editValue(element) {
        let firstText
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            //TODO мигующий курсор появляется только поле даблклика и еще одного клика
            element.focus()
            firstText = element.innerHTML
        })
        element.addEventListener("blur", () => {
            if (element.innerHTML.length < 1 && element.closest(".column")) {
                element.closest(".column").remove()
            }
            element.removeAttribute('contenteditable')
            if (firstText !== element.innerHTML && element.innerHTML) {
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

        axios.post('/fixTitleColumn', body)
            .then(function (response) {
                console.log('element fixed', response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },

    deleteElement(element) {
        console.log(element)
        const body = {
            idParent: element.closest('.column').getAttribute('data-column-id'),
            value: element.querySelector('.title ').innerHTML
        }
        const id = element.parentElement.getAttribute('data-task-id')
        if (id) {
            body.id = id
        }else{
            body.id = null
        }
        console.log('body', body)
        axios.post('/deleteElement', body)
            .then(function (response) {
                console.log('element deleted', response)
            })
            .catch(function (error) {
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