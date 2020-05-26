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
import {
    Authorization
} from "./Authorization.js"

const axios = require('axios').default;

window.onload = () => {
    const listBack = ["url(../img/back_1.jpg)", "url(../img/back_2.jpg)", "url(../img/back_3.jpg)", "url(../img/back_4.jpg)"]
    document.body.style.backgroundImage = BackImage.changeBack(listBack)
}


let getIdUser = new Promise(function (resolve, reject) {
    resolve(Authorization.Menu())
})

getIdUser.then(function (result) {
    console.log(result)
    let idUser = result.idUser
    const body = {
        idUser: idUser
    }
    let getBoard = new Promise(function (resolve, reject) {
        resolve(Send.sendToBack('board/get', body, "POST"))
    })
    getBoard.then(function (result) {
        const containerColumn = document.querySelector('.list-column')
        result.forEach((element) => {
            if (!element.id) {
                const boardColumn = Column.create(element.idParent, idUser, element.value)
                containerColumn.append(boardColumn)
            } else {
                const parentColumn = containerColumn.querySelector(`[data-column-id='${element.idParent}']`)
                const containerTask = parentColumn.querySelector(".list-tasks")
                const boardTask = Task.create(element.id, idUser, element.value)
                containerTask.append(boardTask)
            }
        })
    })

    const buttonAddColumn = document.querySelector(".add-column")

    buttonAddColumn.addEventListener('click', function () {
        let columns = document.querySelectorAll('.column')
        let idColumn = Column.findIdColumn(columns)
        let newColumn = Column.create(idColumn, idUser)
        document.querySelector('.list-column').append(newColumn)
        Column.addColumn(newColumn, idUser)
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
                idUser: idUser,
                idParent: columnId,
                value: columnTitle
            }
            body.push(bodyColumn)

            tasks.forEach(function (item) {
                let taskText = item.querySelector('.task-text').innerHTML
                taskId++
                const bodyTask = {
                    idUser: idUser,
                    idParent: columnId,
                    id: taskId,
                    value: taskText
                }
                body.push(bodyTask)
            })
        })

        axios.post('/board/update', body)
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
})