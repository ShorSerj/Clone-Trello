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
import {
    Send
} from "./sendBack"

const axios = require('axios').default;

// axios.get('/tasks')
//     .then(function (response) {
//         // console.log('response/axios', response)
//         // handle success
//         if (response.data.status.code != 0) {
//             ("Ошибка")
//         }

//         let content = response.data.content
//         if (content.length > 0) {
//             const listColumns = document.querySelector('.list-column')
//             content.forEach((element) => {
//                 const columnNew = Column.create(element.id, element.name)
//                 const list = columnNew.querySelector(".list-tasks")
//                 element.tasks.forEach((task) => {
//                     const taskNew = Task.create(task.id, task.text)
//                     list.append(taskNew)
//                 })
//                 listColumns.append(columnNew)
//             })
//         }

//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });

let boardRequest = new Promise(function (resolve, reject) {
    resolve(Send.sendToBack('/board', "", "GET"))
})

boardRequest.then(function (result) {
    const containerColumn = document.querySelector('.list-column')
    result.forEach((element) => {
        if (!element.id) {
            const boardColumn = Column.create(element.idParent, element.value)
            containerColumn.append(boardColumn)
        } else {
            const parentColumn = containerColumn.querySelector(`[data-column-id='${element.idParent}']`)
            const containerTask = parentColumn.querySelector(".list-tasks")
            const boardTask = Task.create(element.id, element.value)
            containerTask.append(boardTask)
        }
    })
})

window.onload = () => {
    const listBack = ["url(../img/back_1.jpg)", "url(../img/back_2.jpg)", "url(../img/back_3.jpg)", "url(../img/back_4.jpg)"]
    document.body.style.backgroundImage = BackImage.changeBack(listBack)
}

const buttonAddColumn = document.querySelector(".add-column")

buttonAddColumn.addEventListener('click', function () {
    let columns = document.querySelectorAll('.column')
    let idColumn = Column.findIdColumn(columns)
    let newColumn = Column.create(idColumn)
    document.querySelector('.list-column').append(newColumn)
    Column.addColumn(newColumn)
})

window.onbeforeunload = function () {
    let columns = document.querySelectorAll('.column')
    let body = []
    let columnId = 0
    let taskId = 0

    columns.forEach(function (item) {
        let columnTitle = item.querySelector('.title').innerHTML
        let tasks = item.querySelectorAll('.task')
        columnId++
        let bodyColumn = {
            idParent: columnId,
            value: columnTitle
        }
        body.push(bodyColumn)  
        
        tasks.forEach(function (item) {
            let taskText = item.querySelector('.task-text').innerHTML
            taskId++
            const bodyTask = {
                idParent: columnId,
                id: taskId,
                value: taskText
            }
            body.push(bodyTask)        
        })
    })

    axios.post('/updateBoard', body)
    .then(function (response) {
        console.log('all elements save', response)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    })
}