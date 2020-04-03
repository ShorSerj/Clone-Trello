import {
    Column
} from "./column"

const ContextMenu = {
    menuTask(element) {
        if (element.querySelector('.fixing')) {
            let menuTask = document.querySelector('.taskMenu')
            let editTask = document.querySelector('.editTask')
            let deleteTask = document.querySelector('.deleteTask')
            let taskContent = element.querySelector('.edit')

            if (taskContent) {
                menuTask.style.display = 'inline-block'
                let cords = element.getBoundingClientRect()
                menuTask.style.left = cords.left + element.parentElement.offsetWidth + 5 + "px";
                menuTask.style.top = cords.top + "px";
                menuTask.focus()

                menuTask.addEventListener("blur", () => {
                    menuTask.style.display = 'none'
                    taskContent.classList.remove('fixing')
                })

                editTask.addEventListener('click', (event) => {
                    let editTask = element.querySelector('.edit')
                    let dblclick = new MouseEvent('dblclick', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    menuTask.style.display = 'none';
                    editTask.dispatchEvent(dblclick)
                    taskContent.classList.remove('fixing')
                })

                deleteTask.addEventListener('click', () => {
                    if (element && element.querySelector('.fixing') && editTask) {
                        element.classList.remove('fixing')
                        let parent = element.closest('.column')
                        let editTask = element.closest('.task')
                        if (parent) {
                            editTask.remove()
                            Column.deleteElement(editTask, parent)
                            menuTask.style.display = 'none';
                        }
                    }
                })

            }
        }
    },

    menuColumn(element) {
        let edit = element.querySelector('.fixingColumn')
        if (edit) {
            let contextMenu = document.querySelector('.columnMenu')
            let editColumnMenu = document.querySelector('.editColumn')
            let deleteColumnMenu = document.querySelector('.deleteColumn')

            contextMenu.style.display = 'inline'
            let cords = edit.getBoundingClientRect()
            contextMenu.style.left = cords.left + edit.parentElement.offsetWidth + "px";
            contextMenu.style.top = cords.top + "px";
            contextMenu.focus()

            contextMenu.addEventListener("blur", () => {
                contextMenu.style.display = 'none'
                edit.classList.remove('fixingColumn')
            })

            editColumnMenu.addEventListener('click', () => {
                let event = new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                edit.dispatchEvent(event)
                return edit.classList.remove('fixingColumn')
            })

            deleteColumnMenu.addEventListener('click', () => {
                let fixColumn = document.querySelector('.fixingColumn')
                if(fixColumn){
                let deleteColumn = fixColumn.closest('.column')
                Column.deleteElement(deleteColumn)
                deleteColumn.remove()
                return contextMenu.blur()
                }
            })
        }
    }
}

export {
    ContextMenu
}