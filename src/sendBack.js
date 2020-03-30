const Send = {
    sendToBack(url, body, method) {
        const xhr = new XMLHttpRequest()
        console.log(method)
        console.log(url)
        xhr.open(method, url)
        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.send(JSON.stringify(body))

        // 4. Этот код сработает после того, как мы получим ответ сервера
        xhr.onload = function () {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
                return xhr.response
            }
        }

        xhr.onprogress = function (event) { // запускается периодически
            if (event.lengthComputable) {
                // event.loaded - количество загруженных байт
                // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
                // event.total - количество байт всего (только если lengthComputable равно true)
                // alert(`Получено ${event.loaded} из ${event.total} байт`);
            } else {
                // alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }
        }

        xhr.onerror = function () {
            // alert("Запрос не удался");
        };
    }
}
export {
    Send
}