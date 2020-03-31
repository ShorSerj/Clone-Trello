const Send = {
    sendToBack(url, body, method) {
        let promise = new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify(body))
            // 4. Этот код сработает после того, как мы получим ответ сервера
            xhr.onload = function () {
                if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                    // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
                } else { // если всё прошло гладко, выводим результат
                    console.log(xhr.response)
                    resolve(xhr.response)
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
        })
        promise.catch(function(e) {
            // Функция не перевыбросила исключение 'e'
            // в результате произойдёт resolve(undefined)
            // для Promise, возвращённого функцией catch
            console.log(e); // "oh, no!"
        })
        return promise.then()
        
    }
}
export {
    Send
}