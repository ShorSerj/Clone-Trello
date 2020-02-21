export default class Task {
    constructor(id=null, content=''){
        this.taskElement = document.createElement('div')
        this.taskElement.classList.add('task')
        this.taskElement.setAttribute('data-task-id', Task.idCounter)
        this.taskElement.setAttribute('draggable', 'true')
        // this.taskElement.innerHTML = 
        //     `<span class="task-text edit">Создать репозеторий </span>
        //     <div class="dead-line"><i class="fa fa-clock-o" aria-hidden="true"></i><span>2 фев</span></div>`
        const taskText = document.createElement("span")
        taskText.classList.add("task-text")
        const taskDeadLine = document.createElement("div")
        taskDeadLine.classList.add("dead-line")
        this.taskElement.append(taskText)
        this.taskElement.append(taskDeadLine)

        this.taskElement.setAttribute('draggable', true)
        this.taskElement.addEventListener("dragstart", this.evenDragStartTask.bind(this))
        this.taskElement.addEventListener("dragend", this.evenDragEndTask.bind(this))
        this.taskElement.addEventListener("dragenter", this.evenDragEnterTask.bind(this))
        this.taskElement.addEventListener("dragover", this.evenDragOverTask.bind(this))
        this.taskElement.addEventListener("dragleave", this.evenDragLeaveTask.bind(this))
        this.taskElement.addEventListener("drop", this.evenDragDropTask.bind(this))
        
        // columnElement.querySelector('.list-tasks').append(taskElement)
        Task.idCounter++
        // let titleTaskNewElement = taskElement.querySelector('.edit')
        this.taskElement.addEventListener('dblclick', () => {
            this.taskElement.setAttribute('contenteditable', true)
            this.taskElement.focus()
          })
          this.taskElement.addEventListener("blur", ()=>{
            this.taskElement.removeAttribute('contenteditable')
          })  
    }

    evenDragStartTask(event) {
        event.stopPropagation()
        this.classList.add("dragElement")
        Task.draggble = this
    }
    evenDragEndTask (event) {
        event.stopPropagation()
        this.classList.remove("dragElement")
        Task.draggble = null
    }
    evenDragEnterTask(event) {
        event.stopPropagation()
        if(Task.draggble !== this) { 
            // console.log("evenDragEnter", this )
        }    
    }
    evenDragOverTask(event) {
        event.preventDefault()
        event.stopPropagation()
        if(Task.draggble !== this) {
        // console.log("evenDragOver" )
        // console.log(this )
        }
    }
    evenDragLeaveTask = function(event) {
        event.stopPropagation()
        if(Task.draggble !== this) {
        // console.log("evenDragLeave" )
        }
    }
    evenDragDropTask = function(event) {
        event.preventDefault()
        event.stopPropagation()
        if(Task.draggble !== this) {
        // console.log("evenDragDrop", this )
        
        if(this.parentElement === Task.draggble.parentElement){
            const parentElements = Array.from(this.parentElement.querySelectorAll(".task"))
            const x = parentElements.indexOf(this)
            const y = parentElements.indexOf(Task.draggble)
            if(x < y) {
                this.parentElement.insertBefore(Task.draggble, this)
            }
            else{
                this.parentElement.insertBefore(Task.draggble, this.nextElementSibling)
            }
        }
        else{
            this.parentElement.insertBefore(Task.draggble, this)
        }
    }
    }
}
Task.idCounter = 10
Task.draggble = null