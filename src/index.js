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

const axios = require('axios').default;

axios.get('/tasks')
    .then(function (response) {
        // console.log('response/axios', response)
        // handle success
        if (response.data.status.code != 0) {
            console.log("Ошибка")
        }

        let content = response.data.content
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

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// export let response = {value: ""}
const result = Send.sendToBack('/tasks', "", "GET");
// console.log('resultat', result)
// function get(url) {
//     return new Promise(function(succeed, fail) {
//       var request = new XMLHttpRequest();
//       request.open("GET", url, true);
//       request.addEventListener("load", function() {
//         if (request.status < 400)
//           succeed(request.response);
//         else
//           fail(new Error("Request failed: " + request.statusText));
//       });
//       request.addEventListener("error", function() {
//         fail(new Error("Network error"));
//       });
//       request.send();
//     });
//   }

//   get("http://localhost:3001/tasks").then(function(text) {
//   console.log('someText',text);
// }, function(error) {
//   console.log("Error!!!");
//   console.log(error);
// });

window.onload = () => {
    const listBack = ["url(../img/back_1.jpg)", "url(../img/back_2.jpg)", "url(../img/back_3.jpg)", "url(../img/back_4.jpg)"]
    document.body.style.backgroundImage = BackImage.changeBack(listBack)
}

const buttonColumn = document.querySelector(".add-column")

buttonColumn.addEventListener('click', function () {
    let idTasks = document.querySelectorAll('.column')
    let id = Column.findIdColumn(idTasks)
    console.log(id)
    console.log(Column.create(id))
    document.querySelector('.list-column').append(Column.create(id))
})