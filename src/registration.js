const axios = require('axios').default;

const Registration = {
    SignUp() {
        const newUsername = document.querySelector('#newUsername')
        const newPassword = document.querySelector('#passSingUp')
        const confNewPassword = document.querySelector('#passConfirm')
        const newEmail = document.querySelector('#newEmail')
        const submiteNewUser = document.querySelector('.buttonSingUp')
        const messageError = document.querySelector('.signMessageError')
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
            let completeSignUp = document.querySelector('.agreeLogIn')
            if (statusSignUp) {
                const createAccount = {
                    username: newUsername.value,
                    email: newEmail.value,
                    password: newPassword.value
                }
                axios.post('/createAccount', createAccount)
                    .then(function (response) {


                        if (response.data === "Error username") {
                            document.querySelector('.successMessage').innerHTML = "This username is already registered"
                            document.querySelector('.agreeLogIn').innerHTML = "Correct mistakes"
                            document.querySelector('.successRegister').style.display = "block"

                            let correctUsername = function () {
                                document.querySelector('.successRegister').style.display = "none"
                                completeSignUp.removeEventListener('click', correctUsername)
                            }

                            completeSignUp.addEventListener('click', correctUsername)
                        } else {
                            document.querySelector('.successMessage').innerHTML = "Registration completed successfully. Now you need to log in to your account."
                            document.querySelector('.agreeLogIn').innerHTML = "Log in"
                            document.querySelector('.successRegister').style.display = "block"
                            newUsername.value = ""
                            newPassword.value = ""
                            confNewPassword.value = ""
                            newEmail.value = ""

                            let sucessUsername = function () {
                                document.querySelector('.successRegister').style.display = "none"
                                document.querySelector('.titleLog').click()
                                completeSignUp.removeEventListener('click', sucessUsername)
                            }

                            completeSignUp.addEventListener('click', sucessUsername)
                        }
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



    }
}

export {
    Registration
}