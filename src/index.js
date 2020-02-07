import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";

let taskIdCounter = 10;
let columnIdCounter = 4;

let read = document.querySelectorAll(".column")
console.log(read)
read.forEach(columnElement => {
    let buttonAddTask = columnElement.querySelector(".add-task")
    buttonAddTask.addEventListener('click', function(e) {
        const taskElement = document.createElement('div')
        taskElement.classList.add('task')
        taskElement.setAttribute('data-task-id', taskIdCounter)
        taskElement.setAttribute('draggable', 'true')
        taskElement.innerHTML = 
            `<span class="task-text">Создать репозеторий </span>
            <div class="dead-line"><i class="fa fa-clock-o" aria-hidden="true"></i><span>2 фев</span></div>`
        
        columnElement.querySelector('.list-tasks').append(taskElement)
        taskIdCounter++

    })
})