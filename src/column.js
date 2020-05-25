import {
    Task
} from "./task"

const axios = require('axios').default;

const Column = {
    idCounter: 4,
    darggbleColumn: null,

    create(id = null, idUser, title = "") {
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
        columnTitle.classList.add("title")
        columnTitle.setAttribute('tabindex', 0)
        columnTitle.innerHTML = title

        const columnButtonMenu = document.createElement("i")
        columnButtonMenu.classList.add("list-actions")
        columnButtonMenu.classList.add("fas")
        columnButtonMenu.classList.add("fa-ellipsis-h")

        Column.contextMenu(columnNewElement, columnTitle, columnButtonMenu, idUser)

        const taskContainer = document.createElement("div")
        taskContainer.classList.add("list-tasks")

        const buttonAddTask = document.createElement("button")
        buttonAddTask.classList.add("add-task")
        buttonAddTask.innerHTML = `Добавить задачу`

        columnHead.append(columnTitle)
        columnHead.append(columnButtonMenu)

        columnNewElement.append(columnHead)
        columnNewElement.append(taskContainer)
        columnNewElement.append(buttonAddTask)

        Column.eventAddTask(columnNewElement, idUser)
        Column.addDragnDropEventColums(columnNewElement)

        if (!id) {
            Column.idCounter++
        }
        return columnNewElement
    },

    contextMenu(columnNewElement, columnTitle, columnButtonMenu, idUser) {
        const columnContextMenu = document.createElement('nav')
        columnContextMenu.classList.add('columnMenu')
        columnContextMenu.setAttribute('tabindex', 0)

        const titleContextMenu = document.createElement('span')
        titleContextMenu.classList.add('titleMenu')
        titleContextMenu.innerHTML = 'List Actions'
        columnContextMenu.append(titleContextMenu)

        const contextContainer = document.createElement('ul')
        contextContainer.classList.add('contextMenu__items')

        //Button Edit
        const contextEdit = document.createElement('li')
        contextEdit.classList.add('contextMenu__item')

        const contextEditButton = document.createElement('span')
        contextEditButton.classList.add('contexMenu__link')
        contextEditButton.innerHTML = 'Edit Column'

        const contextEditButtonImg = document.createElement('i')
        contextEditButtonImg.classList.add('fa')
        contextEditButtonImg.classList.add('fa-edit')

        contextEditButton.prepend(contextEditButtonImg)
        contextEdit.append(contextEditButton)
        contextContainer.append(contextEdit)
        columnContextMenu.append(contextContainer)

        contextEditButton.addEventListener('click', () => {
            columnTitle.setAttribute('contenteditable', true)
            columnTitle.focus()
            let firstTitle = columnTitle.innerHTML

            const eventBlur = function () {
                if (columnTitle.innerHTML.length < 1) {
                    columnNewElement.remove()
                }
                columnTitle.removeAttribute('contenteditable')
                if (columnTitle.innerHTML !== firstTitle) {
                    Column.updateColumn(columnTitle, idUser)
                    columnTitle.removeEventListener("blur", eventBlur)
                }
            }
            columnTitle.addEventListener("blur", eventBlur)
        })
        // \Button Edit

        // Button Delete
        const contextDel = document.createElement('li')
        contextDel.classList.add('contextMenu__item')

        const contextDelButton = document.createElement('span')
        contextDelButton.classList.add('contexMenu__link')
        contextDelButton.innerHTML = 'Delete Column'

        const contextDelButtonImg = document.createElement('i')
        contextDelButtonImg.classList.add('fa')
        contextDelButtonImg.classList.add('fa-times')

        contextDelButton.prepend(contextDelButtonImg)
        contextDel.append(contextDelButton)
        contextContainer.append(contextDel)

        contextDelButton.addEventListener('click', () => {
            columnTitle.focus()
            Column.deleteColumn(columnNewElement)
        })
        // \Button Delete

        columnButtonMenu.addEventListener('click', () => {
            columnContextMenu.style.display = 'inline'
            columnContextMenu.focus()

            columnContextMenu.addEventListener("blur", () => {
                columnContextMenu.style.display = 'none'
            })
        })
        columnNewElement.append(columnContextMenu)
    },

    addColumn(element, idUser) {
        let columnNew = element.querySelector('.title')
        columnNew.setAttribute('contenteditable', true)
        columnNew.focus()

        let eventBlur = function () {
            if (columnNew.innerHTML.length < 1) {
                element.remove()
            } else {
                columnNew.removeAttribute('contenteditable')

                const body = {
                    idUser: idUser,
                    idParent: element.getAttribute('data-column-id'),
                    text: element.querySelector('.title').innerHTML
                }

                axios.post('/column/create', body)
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

                columnNew.removeEventListener("blur", eventBlur)
            }
        }
        columnNew.addEventListener("blur", eventBlur)
        return columnNew
    },

    findIdColumn(columns) {
        let columnNextId = 1
        columns.forEach((elem) => {
            let columnId = elem.getAttribute('data-column-id')
            if (Number(columnId) > columnNextId) {
                columnNextId = columnId
            }
        })
        columnNextId++
        return columnNextId
    },

    updateColumn(element, idUser) {
        const body = {
            idUser: idUser,
            idParent: element.closest('.column').getAttribute('data-column-id'),
            text: element.innerHTML
        }
        axios.post('/column/update', body)
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

    eventAddTask(columnElement, idUser) {
        let buttonAddTask = columnElement.querySelector(".add-task")
        buttonAddTask.addEventListener('click', function () {
            let idTasks = document.querySelectorAll('.task')
            let id = Task.findIdTask(idTasks, idUser)
            let taskNew = Task.create(id, idUser)
            columnElement.querySelector('.list-tasks').append(taskNew)
            Task.addTask(taskNew, columnElement, idUser)
        })
    },

    deleteColumn(element, idUser) {
        if (element.querySelector('.task')) {
            let centerX = document.documentElement.clientWidth / 2 - 502 / 2;
            let centerY = document.documentElement.clientHeight / 2 - 200;
            let windowAlert= document.querySelector('.containerError')
            windowAlert.style.display = 'block'
            windowAlert.style.top = centerY + 'px'
            windowAlert.style.left = centerX + 'px'

            let errButton= document.querySelector('#errButton')
            errButton.addEventListener('click', function(){
                windowAlert.style.display = 'none'
            })
            
        } else {
            element.remove()
            console.log('element', element)
            const body = {
                idUser: idUser
            }
            body.idParent = element.closest('.column').getAttribute('data-column-id')
            axios.post('/column/delete', body)
                .then(function (response) {
                    console.log('element deleted', response)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
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