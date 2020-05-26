import {
    Send
} from "./sendBack"
import {
    Registration
} from "./registration"

const axios = require('axios').default;

const Authorization = {
    Menu() {
        const logIn = document.querySelector('.logIn')
        const logButton = document.querySelector('.titleLog')
        const signButton = document.querySelector('.titleSign')

        const logBody = document.querySelector('#bodyLogIn')
        const signBody = document.querySelector('#bodySignUp')

        logIn.style.top = document.documentElement.clientHeight / 2 - 250 + "px"
        logIn.style.left = document.documentElement.clientWidth / 2 - 200 + "px"


        logButton.addEventListener('click', function () {
            signButton.style.color = 'grey'
            signBody.style.display = 'none'

            logButton.style.color = 'rgb(29,161,242)'
            logBody.style.display = 'inherit'
        })

        signButton.addEventListener('click', function () {
            logButton.style.color = 'grey'
            logBody.style.display = 'none'

            signButton.style.color = 'rgb(29,161,242)'
            signBody.style.display = 'inherit'
        })

        Registration.SignUp()
        Authorization.logOut()

        let getId = new Promise(function (resolve, reject) {
            resolve(Authorization.logIn())
        })
        return getId.then()
    },
    logIn() {
        let promise = new Promise(function (resolve, reject) {
            let status = false
            const username = document.querySelector('#username')
            const password = document.querySelector('#pass')

            username.closest('.username').addEventListener('click', function () {
                document.querySelector('.logMessageError').style.display = 'none'
                username.closest('.username').style.color = 'rgb(29,161,242)'
                username.closest('.username').style.borderBottom = 'solid 2px rgb(29,161,242)'

                username.addEventListener('blur', function () {
                    username.closest('.username').style.color = 'black'
                    username.closest('.username').style.borderBottom = '2px solid rgb(101, 119, 134)'

                    if (username.value && password.value) {
                        submite.style.backgroundColor = 'rgb(29,161,242)'
                        status = true
                    } else {
                        submite.style.backgroundColor = 'rgba(29,161,242,0.5)'
                        status = false
                    }
                })
            })

            password.closest('.password').addEventListener('click', function () {
                document.querySelector('.logMessageError').style.display = 'none'
                password.closest('.password').style.color = 'rgb(29,161,242)'
                password.closest('.password').style.borderBottom = 'solid 2px rgb(29,161,242)'

                password.addEventListener('blur', function () {
                    password.closest('.password').style.color = 'black'
                    password.closest('.password').style.borderBottom = '2px solid rgb(101, 119, 134)'

                    if (username.value && password.value) {
                        submite.style.backgroundColor = 'rgb(29,161,242)'
                        status = true
                    } else {
                        submite.style.backgroundColor = 'rgba(29,161,242,0.5)'
                        status = false
                    }
                })
            })

            const submite = document.querySelector('#bodyLogIn > button')

            submite.addEventListener('click', function (event) {
                event.preventDefault()
                if (status) {
                    const userlogIn = {
                        username: username.value,
                        password: password.value
                    }
                    axios.post('/user/login', userlogIn)
                        .then(function (response) {
                            if (response.data.error) {
                                document.querySelector('.logMessageError').style.display = 'block'
                            } else {
                                document.querySelector('.logMessageError').style.display = 'none'
                                document.querySelector('.containerLogIn').style.display = 'none'
                                username.value = ""
                                password.value = ""
                                let id = response.data
                                resolve(id)
                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                        .then(function () {
                            // always executed
                        });
                }
            })

        })
        return promise.then()
    },

    logOut() {
        let user = document.querySelector('.user')
        let logMenu = document.querySelector('.logMenu')
        let logOutButton = document.querySelector('.logOut')

        user.addEventListener('click', function () {
            logMenu.style.display = 'block'
            logMenu.focus()

            logMenu.addEventListener('blur', () => {
                logMenu.style.display = 'none'
            })
        })

        logOutButton.addEventListener('click', function () {
            logMenu.style.display = 'none'
            Send.sendToBack('/user/logout', "", "GET")
            document.querySelector('.containerLogIn').style.display = 'block'
        })
    }
}

export {
    Authorization
}