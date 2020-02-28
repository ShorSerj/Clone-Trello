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

    editValue(element) {
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            element.focus()
        })
        element.addEventListener("blur", () => {
            if (element.innerHTML.length < 1 && element.closest(".task")) {
                element.closest(".task").remove()
            }

            element.removeAttribute('contenteditable')
        })
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
            // TODO: добавить условие исключения переноса колонки в задачу, т.к. при переносе в консоли появляется ошибка
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