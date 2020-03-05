import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";
import {
    Task
} from "./task.js"
import {
    Column
} from "./column.js"
import {
    BackImage
} from "./backImage.js"
// import response from "./response.json"
import {
    Send
} from "./sendBack"

export let response = {value: ""}

Send.sendToBack('/tasks', "", "GET");

window.onload = () => {

    if (response.value.status.code != 0) {
        console.log("Ошибка")
    }

    let content = response.value.content
    if (content.length > 0) {
        const listColumns = document.querySelector('.list-column')
        content.forEach((element) => {
            const columnNew = Column.create(element.id, element.name)
            const list = columnNew.querySelector(".list-tasks")
            element.tasks.forEach((task) => {
                const taskNew = Task.create(task.id, task.text)
                list.append(taskNew)
            })
            listColumns.append(columnNew)
        })
    }

    const listBack = ["url(../img/back_1.jpg", "url(../img/back_2.jpg", "url(../img/back_3.jpg", "url(../img/back_4.jpg"]
    BackImage.changeBack(listBack)
}

const buttonColumn = document.querySelector(".add-column")

buttonColumn.addEventListener('click', function () {
    let id = Column.findIdColumn()
    document.querySelector('.list-column').append(Column.create(id))
})
