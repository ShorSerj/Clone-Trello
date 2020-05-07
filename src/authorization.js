import {
    Send
} from "./sendBack"

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
        Authorization.SignUp()
        Authorization.logOut()

    },
    logIn() {
        let status = false

        const username = document.querySelector('#username')
        const password = document.querySelector('#pass')

        username.closest('.username').addEventListener('click', function () {
            username.focus()
            document.querySelector('.messageError').style.display = 'none'
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
            document.querySelector('.messageError').style.display = 'none'
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
    SignUp() {
        const newUsername = document.querySelector('#newUsername')
        const newPassword = document.querySelector('#passSingUp')
        const confNewPassword = document.querySelector('#passConfirm')
        const newEmail = document.querySelector('#newEmail')
        const submiteNewUser = document.querySelector('.buttonSingUp')
        const messageError =document.querySelector('.signMessageError')
        let statusSignUp = false

        newUsername.closest('.username').addEventListener('click', function () {
            document.querySelector('.signMessageError').style.display = "none"
            
            newUsername.focus()
            newUsername.closest('.username').style.color = 'rgb(29,161,242)'
            newUsername.closest('.username').style.borderBottom = 'solid 2px rgb(29,161,242)'

            newUsername.addEventListener('blur', function () {
                var reg = /^([A-Za-z])+([A-Za-z0-9_\-\.])$/;
                var name = newUsername.value

                if (reg.test(name) == false) {
                    messageError.innerHTML = 'Username must be at least 2 characters long and begin with a letter'
                    messageError.style.display = "block"
                    newUsername.closest('.username').style.borderBottom = '2px solid rgb(300, 0, 0)'
                } else {
                    newUsername.closest('.username').style.color = 'black'
                    newUsername.closest('.username').style.borderBottom = '2px solid rgb(101, 119, 134)'

                    if (newUsername.value && newPassword.value && confNewPassword.value) {
                        submiteNewUser.style.backgroundColor = 'rgb(29,161,242)'
                        statusSignUp = true
                    } else {
                        submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                        statusSignUp = false
                    }
                }
            })
        })

        newPassword.closest('.password').addEventListener('click', function () {
            messageError.style.display = "none"
            newPassword.focus()
            newPassword.closest('.password').style.color = 'rgb(29,161,242)'
            newPassword.closest('.password').style.borderBottom = 'solid 2px rgb(29,161,242)'

            newPassword.addEventListener('blur', function () {
                newPassword.closest('.password').style.color = 'black'

                if (newUsername.value && newPassword.value && confNewPassword.value) {
                    if (newPassword.value === confNewPassword.value) {
                        newPassword.closest('.password').style.borderBottom = '2px solid rgb(101, 119, 134)'
                        confNewPassword.closest('.password').style.borderBottom = '2px solid rgb(101, 119, 134)'
                        submiteNewUser.style.backgroundColor = 'rgb(29,161,242)'
                        statusSignUp = true
                    } else {
                        messageError.innerHTML = 'passwords must match'
                        messageError.style.display = "block"
                        newPassword.closest('.password').style.borderBottom = '2px solid  rgb(300, 0, 0)'
                        statusSignUp = false
                        submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                    }
                } else {
                    submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                    statusSignUp = false
                }
            })
        })

        confNewPassword.closest('.password').addEventListener('click', function () {
            messageError.style.display = "none"
            confNewPassword.focus()
            confNewPassword.closest('.password').style.color = 'rgb(29,161,242)'
            confNewPassword.closest('.password').style.borderBottom = 'solid 2px rgb(29,161,242)'

            confNewPassword.addEventListener('blur', function () {
                confNewPassword.closest('.password').style.color = 'black'


                if (newUsername.value && newPassword.value && confNewPassword.value) {
                    if (newPassword.value === confNewPassword.value) {
                        confNewPassword.closest('.password').style.borderBottom = '2px solid rgb(101, 119, 134)'
                        submiteNewUser.style.backgroundColor = 'rgb(29,161,242)'
                        statusSignUp = true
                    } else {
                        messageError.innerHTML = 'passwords must match'
                        messageError.style.display = "block"
                        confNewPassword.closest('.password').style.borderBottom = '2px solid  rgb(300, 0, 0)'
                        statusSignUp = false
                        submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                    }
                } else {
                    submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                    statusSignUp = false
                }
            })
        })

        newEmail.closest('.email').addEventListener('click', function () {
            messageError.style.display = "none"
            newEmail.focus()
            newEmail.closest('.email').style.color = 'rgb(29,161,242)'
            newEmail.closest('.email').style.borderBottom = 'solid 2px rgb(29,161,242)'

            newEmail.addEventListener('blur', function () {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = newEmail.value

                if (reg.test(address) == false) {
                    messageError.innerHTML = 'Your email address is incorrect'
                        messageError.style.display = "block"
                    newEmail.closest('.email').style.borderBottom = '2px solid rgb(300, 0, 0)'
                } else {
                    newEmail.closest('.email').style.color = 'black'
                    newEmail.closest('.email').style.borderBottom = '2px solid rgb(101, 119, 134)'
                }

                if (newUsername.value && newPassword.value && confNewPassword.value) {
                    submiteNewUser.style.backgroundColor = 'rgb(29,161,242)'
                    statusSignUp = true
                } else {
                    submiteNewUser.style.backgroundColor = 'rgba(29,161,242,0.5)'
                    statusSignUp = false
                }
            })

        })

        submiteNewUser.addEventListener('click', function () {
            if (statusSignUp) {
                const createAccount = {
                    username: newUsername.value,
                    email: newEmail.value,
                    password: newPassword.value
                }
                axios.post('/createAccount', createAccount)
                    .then(function (response) {
                        console.log('User is registered!', response)
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
                // }
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