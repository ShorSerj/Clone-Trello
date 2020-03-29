
const Send = {
    // 
    example() {
        const some = "dsad"
        return some
    },
    sendToBack(url, body, method) {
        function get(url) {
            return new Promise(function (succeed, fail) {
                const xhr = new XMLHttpRequest()
                xhr.open(method, url)
                xhr.responseType = 'json'
                xhr.setRequestHeader('Content-Type', 'application/json')

                xhr.send(JSON.stringify(body))
                // console.log(body)

                // 4. Этот код сработает после того, как мы получим ответ сервера
                xhr.onload = function () {
                    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                        // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
                    } else { // если всё прошло гладко, выводим результат
                        // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
                        // console.log('This is xhr', xhr.response)
                        // response.value = xhr.response
                        // return xhr.response
                        succeed(xhr.response)
                    }
                };

                xhr.onprogress = function (event) { // запускается периодически
                    if (event.lengthComputable) {
                        // event.loaded - количество загруженных байт
                        // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
                        // event.total - количество байт всего (только если lengthComputable равно true)
                        // alert(`Получено ${event.loaded} из ${event.total} байт`);
                    } else {
                        // alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
                    }

                };

                xhr.onerror = function () {
                    // alert("Запрос не удался");
                };
            })
        }
        get(url).then(function(text) {
            // console.log('someText', text)
            return text
        }, function(error) {
            console.log(error);
        })
    }
}

export {
    Send
}