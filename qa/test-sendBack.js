const send = require('../src/sendBack.js')
const expect = require('chai').expect
const assert = require('chai').assert
const axios = require('axios').default;
///////////////////////////////////////////
//sendToBack 
//Send.sendToBack("http://localhost:8000/fixTitleTask", body, "POST")
//const result = Send.sendToBack('/tasks', "", "GET");
let body = ""
axios.post('/fixTitleColumn', body)
            .then(function (response) {
                console.log('element fixed',response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });