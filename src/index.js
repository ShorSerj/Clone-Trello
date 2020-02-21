import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";
// import "/column.js";
// import "/task.js";
import Task from './task.js';

let taskIdCounter = 10;
let columnIdCounter = 4;



const task1 =  new Task();
console.log("ConstTask",task1)

const editValue = function(element){
    element.addEventListener('dblclick', () => {
        element.setAttribute('contenteditable', true)
        element.focus()
      })
      element.addEventListener("blur", ()=>{
          element.removeAttribute('contenteditable')
      })  
}

const eventAddTask = columnElement => {
    let buttonAddTask = columnElement.querySelector(".add-task")
    buttonAddTask.addEventListener('click', function() {
        const taskElement = document.createElement('div')
        taskElement.classList.add('task')
        taskElement.setAttribute('data-task-id', taskIdCounter)
        taskElement.setAttribute('draggable', 'true')
        taskElement.innerHTML = 
            `<span class="task-text edit">Создать репозеторий </span>
            <div class="dead-line"><i class="fa fa-clock-o" aria-hidden="true"></i><span>2 фев</span></div>`
        
        columnElement.querySelector('.list-tasks').append(taskElement)
        taskIdCounter++
        let titleTaskNewElement = taskElement.querySelector('.edit')
        editValue(titleTaskNewElement)
        addDragnDropEvent(taskElement)
    })
    addDragnDropEventColums(columnElement)
}

const eventAddTaskLists = listTasks => {
    listTasks.setAttribute('draggable', true)
    listTasks.addEventListener("dragstart", evenDragStartListTasks)
    listTasks.addEventListener("dragend", evenDragEndListTasks)
    listTasks.addEventListener("dragenter", evenDragEnterListTasks)
    listTasks.addEventListener("dragover", evenDragOverListTasks)
    listTasks.addEventListener("dragleave", evenDragLeaveListTasks)
    listTasks.addEventListener("drop", evenDragDropListTasks)
}

const buttonColumn = document.querySelector(".add-column") 
const chooseColumn = document.querySelectorAll(".column")
const chooseTask = document.querySelectorAll(".task")
const chooseListTask = document.querySelectorAll(".list-tasks")

chooseListTask.forEach(eventAddTaskLists)

let darggbleTask = null
let darggbleColumn = null

///
const evenDragStartListTasks = function(event) {
    event.stopPropagation()
}
const evenDragEndListTasks = function(event) {
    event.stopPropagation()
}
const evenDragEnterListTasks = function(event) {
    event.stopPropagation()
    // if(darggbleTask && this.childNodes.length < 1) { 
        console.log("evenDragEnterListTasks", evenDragEnterListTasks )
    // }
    
}
const evenDragOverListTasks = function(event) {
    event.preventDefault()
    event.stopPropagation()
    // if(darggbleTask !== this || !darggbleColumn) {
    // // console.log("evenDragOver" )
    // // console.log(this )
    // }
}
const evenDragLeaveListTasks = function(event) {
    event.stopPropagation()
    // if(darggbleTask !== this || !darggbleColumn) {
    // // console.log("evenDragLeave" )
    // }
}
const evenDragDropListTasks = function(event) {
    event.preventDefault()
    event.stopPropagation()
//     if(darggbleTask !== this || !darggbleColumn) {
//     // console.log("evenDragDrop", this )
    
//     if(this.parentElement === darggbleTask.parentElement && !darggbleColumn){
//         const parentElements = Array.from(this.parentElement.querySelectorAll(".task"))
//         const x = parentElements.indexOf(this)
//         const y = parentElements.indexOf(darggbleTask)
//         if(x < y) {
//             this.parentElement.insertBefore(darggbleTask, this)
//         }
//         else{
//             this.parentElement.insertBefore(darggbleTask, this.nextElementSibling)
//         }
//     }
//     else{
//         this.parentElement.insertBefore(darggbleTask, this)
//     }
// }
}
///
///
const evenDragStartTask = function(event) {
    event.stopPropagation()
    this.classList.add("dragElement")
    darggbleTask = this
}
const evenDragEndTask = function(event) {
    event.stopPropagation()
    this.classList.remove("dragElement")
    darggbleTask = null
}
const evenDragEnterTask = function(event) {
    event.stopPropagation()
    if(darggbleTask !== this || !darggbleColumn) { 
        // console.log("evenDragEnter", this )
    }
    
}
const evenDragOverTask = function(event) {
    event.preventDefault()
    event.stopPropagation()
    if(darggbleTask !== this || !darggbleColumn) {
    // console.log("evenDragOver" )
    // console.log(this )
    }
}
const evenDragLeaveTask = function(event) {
    event.stopPropagation()
    if(darggbleTask !== this || !darggbleColumn) {
    // console.log("evenDragLeave" )
    }
}
const evenDragDropTask = function(event) {
    event.preventDefault()
    event.stopPropagation()
    if(darggbleTask !== this || !darggbleColumn) {
    // console.log("evenDragDrop", this )
    
    if(this.parentElement === darggbleTask.parentElement && !darggbleColumn){
        const parentElements = Array.from(this.parentElement.querySelectorAll(".task"))
        const x = parentElements.indexOf(this)
        const y = parentElements.indexOf(darggbleTask)
        if(x < y) {
            this.parentElement.insertBefore(darggbleTask, this)
        }
        else{
            this.parentElement.insertBefore(darggbleTask, this.nextElementSibling)
        }
    }
    else{
        this.parentElement.insertBefore(darggbleTask, this)
    }
}
}
//
///
//
const evenDragStartColumn = function(event) {
    this.classList.add("dragElement")
    darggbleColumn = this
    console.log(darggbleColumn)

}
const evenDragEndColumn = function(event) {
    this.classList.remove("dragElement")
    darggbleColumn = null
}
const evenDragEnterColumn = function(event) {
    event.stopPropagation()
    if(darggbleColumn !== this || !darggbleTask) {
        // console.log("evenDragEnter", this )
    }
   
}
const evenDragOverColumn = function(event) {
    event.preventDefault()
    event.stopPropagation()
    if(darggbleColumn !== this || !darggbleTask) {
    // console.log("evenDragOverColumn" )
    }
}
const evenDragLeaveColumn = function(event) {
    event.stopPropagation()
    if(darggbleColumn !== this || !darggbleTask) {
    // console.log("evenDragLeave" )
    }
}
const evenDragDropColumn = function(event) {
    event.preventDefault()
    event.stopPropagation()
    if(darggbleColumn !== this && darggbleColumn) {
    console.log("darggbleColumn", darggbleColumn, "darggbleTask", darggbleTask)
    if(this.parentElement === darggbleColumn.parentElement ){
        const parentElements = Array.from(this.parentElement.querySelectorAll(".column"))
        const x = parentElements.indexOf(this)
        const y = parentElements.indexOf(darggbleColumn)
        if(x < y) {
            this.parentElement.insertBefore(darggbleColumn, this)
        }
        else{
            this.parentElement.insertBefore(darggbleColumn, this.nextElementSibling)
        }
    }
    else{
        this.parentElement.insertBefore(darggbleColumn, this)
    }
    
    }    
}
const addDragnDropEvent = (chooseTask) => {
    chooseTask.setAttribute('draggable', true)
    chooseTask.addEventListener("dragstart", evenDragStartTask)
    chooseTask.addEventListener("dragend", evenDragEndTask)
    chooseTask.addEventListener("dragenter", evenDragEnterTask)
    chooseTask.addEventListener("dragover", evenDragOverTask)
    chooseTask.addEventListener("dragleave", evenDragLeaveTask)
    chooseTask.addEventListener("drop", evenDragDropTask)
}
const addDragnDropEventColums = (columnElement) => {
    columnElement.setAttribute('draggable', true)
    columnElement.addEventListener("dragstart", evenDragStartColumn)
    columnElement.addEventListener("dragend", evenDragEndColumn)
    columnElement.addEventListener("dragenter", evenDragEnterColumn)
    columnElement.addEventListener("dragover", evenDragOverColumn)
    columnElement.addEventListener("dragleave", evenDragLeaveColumn)
    columnElement.addEventListener("drop", evenDragDropColumn)
}
chooseTask.forEach(addDragnDropEvent)
// console.log(chooseColumn)

chooseColumn.forEach(eventAddTask)

buttonColumn.addEventListener('click', function() {
    const columnNewElement = document.createElement('div')
    columnNewElement.classList.add('column')
    columnNewElement.setAttribute('data-column-id', columnIdCounter)
    columnNewElement.setAttribute('draggable', true)
    columnNewElement.innerHTML = 
        `<div class="column-header">
            <div class="title edit">Done</div>
            <span class="list-actions"><span>...</span></span>
        </div>
        <div class="list-tasks">
        </div>
        <button class="add-task">Добавить задачу</button>`
    document.querySelector('.list-column').append(columnNewElement)
    columnIdCounter++
    eventAddTask(columnNewElement)
    const titleColumnNewElement = columnNewElement.querySelector('.edit')
    editValue(titleColumnNewElement)
})

//Совершает поиск элементов с классом .edit и вешает на них обработчик событий при срабатывании которого можно поменять название блока
document.querySelectorAll('.edit').forEach(editValue)
