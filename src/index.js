import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";

let taskIdCounter = 10;
let columnIdCounter = 4;



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
const buttonColumn = document.querySelector(".add-column") 
const chooseColumn = document.querySelectorAll(".column")
const chooseTask = document.querySelectorAll(".task")


let darggbleElement = null
const evenDragStart = function(event) {
    // event.stopPropagation()
    // event.preventDefault()
    this.classList.add("dragElement")
    darggbleElement = this
    // console.log(this )
}
const evenDragEnd = function(event) {
    this.classList.remove("dragElement")
    darggbleElement = null
}
const evenDragEnter = function(event) {
    if(darggbleElement !== this) {
        // console.log("evenDragEnter", this )
    }
    
}
const evenDragOver = function(event) {
    event.preventDefault()
    // event.stopPropagation()
    if(darggbleElement !== this) {
    // console.log("evenDragOver" )
    }
}
const evenDragLeave = function(event) {
    if(darggbleElement !== this) {
    // console.log("evenDragLeave" )
    }
}
const evenDragDrop = function(event) {
    event.stopPropagation()
    if(darggbleElement !== this) {
    // console.log("evenDragDrop", this )
    
    if(this.parentElement === darggbleElement.parentElement){
        const parentElements = Array.from(this.parentElement.querySelectorAll(".task"))
        const x = parentElements.indexOf(this)
        const y = parentElements.indexOf(darggbleElement)
        if(x < y) {
            this.parentElement.insertBefore(darggbleElement, this)
        }
        else{
            this.parentElement.insertBefore(darggbleElement, this.nextElementSibling)
        }
    }
    else{
        this.parentElement.insertBefore(darggbleElement, this)
    }
}
}
//
///
//
const evenDragStartColumn = function(event) {
    // event.stopPropagation()
    // event.preventDefault()
    this.classList.add("dragElement")
    darggbleElement = this
    console.log(darggbleElement)

}
const evenDragEndColumn = function(event) {
    this.classList.remove("dragElement")
    darggbleElement = null
}
const evenDragEnterColumn = function(event) {
    if(darggbleElement !== this) {
        // console.log("evenDragEnter", this )
    }
   
}
const evenDragOverColumn = function(event) {
    event.preventDefault()
    // event.stopPropagation()
    if(darggbleElement !== this) {
    // console.log("evenDragOver" )
    }
}
const evenDragLeaveColumn = function(event) {
    if(darggbleElement !== this) {
    // console.log("evenDragLeave" )
    }
}
const evenDragDropColumn = function(event) {
    event.stopPropagation()
    if(darggbleElement !== this) {
    // console.log("evenDragDrop", this )
    if(this.parentElement === darggbleElement.parentElement){
        const parentElements = Array.from(this.parentElement.querySelectorAll(".column"))
        const x = parentElements.indexOf(this)
        const y = parentElements.indexOf(darggbleElement)
        if(x < y) {
            this.parentElement.insertBefore(darggbleElement, this)
        }
        else{
            this.parentElement.insertBefore(darggbleElement, this.nextElementSibling)
        }
    }
    else{
        this.parentElement.insertBefore(darggbleElement, this)
    }
    
    }    
}
const addDragnDropEvent = (chooseTask) => {
    chooseTask.setAttribute('draggable', true)
    chooseTask.addEventListener("dragstart", evenDragStart)
    chooseTask.addEventListener("dragend", evenDragEnd)
    chooseTask.addEventListener("dragenter", evenDragEnter)
    chooseTask.addEventListener("dragover", evenDragOver)
    chooseTask.addEventListener("dragleave", evenDragLeave)
    chooseTask.addEventListener("drop", evenDragDrop)
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
