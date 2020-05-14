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

        const logBody = document.querySelector('.bodyLogIn')
        const signbODY = document.querySelector('.bodySignUp')

        logIn.style.top = document.documentElement.clientHeight / 2 - 250 + "px"
        logIn.style.left = document.documentElement.clientWidth / 2 - 200 + "px"


        logButton.addEventListener('click', function () {
            signButton.style.color = 'grey'
            signbODY.style.display = 'none'

            logButton.style.color = 'rgb(29,161,242)'
            logBody.style.display = 'inherit'
        })

        signButton.addEventListener('click', function () {
            logButton.style.color = 'grey'
            logBody.style.display = 'none'

            signButton.style.color = 'rgb(29,161,242)'
            signbODY.style.display = 'inherit'
        })

        Authorization.logIn()
        Registration.SignUp()
        Authorization.logOut()

    },
    logIn() {
        let status = false

        const username = document.querySelector('#username')
        const password = document.querySelector('#pass')

        username.closest('.username').addEventListener('click', function () {
            username.focus()
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
            password.focus()
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

        const submite = document.querySelector('.buttonLogIn')

        submite.addEventListener('click', function () {
            if (status) {
                const userlogIn = {
                    username: username.value,
                    password: password.value
                }

                axios.post('/logIn', userlogIn)
                    .then(function (response) {
                        console.log('User log in!', response)
                        if (response.data === 'Login error') {
                            document.querySelector('.logMessageError').style.display = 'block'
                        } else {
                            document.querySelector('.logMessageError').style.display = 'none'
                            document.querySelector('.containerLogIn').style.display = 'none'
                            username.value = ""
                            password.value = ""
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
            Send.sendToBack('/logOut', "", "GET")
            document.querySelector('.containerLogIn').style.display = 'block'
        })
    }
}

export {
    Authorization
}