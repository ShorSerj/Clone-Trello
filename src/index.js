import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";
import { Task } from "./task.js"
import { Column } from "./column.js"



window.onload = () => {
    const listBack = ["url(/src/assets/back_1.jpg", "url(/src/assets/back_2.jpg", "url(/src/assets/back_3.jpg", "url(/src/assets/back_4.jpg"]
    const randomBack = Math.floor(Math.random() * listBack.length)
    document.body.style.backgroundImage = listBack[randomBack]
}

const buttonColumn = document.querySelector(".add-column")
const chooseColumn = document.querySelectorAll(".column")
const chooseTask = document.querySelectorAll(".task")

chooseTask.forEach(Task.addDragnDropEvent)
chooseColumn.forEach(Column.eventAddTask)

buttonColumn.addEventListener('click', function () {
    document.querySelector('.list-column').append(Column.create())
})

//Совершает поиск элементов с классом .edit и вешает на них обработчик событий при срабатывании которого можно поменять название блока
document.querySelectorAll('.edit').forEach(Column.editValue)