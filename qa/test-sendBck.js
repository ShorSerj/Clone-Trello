const send = require('../src/sendBack.js')
const expect = require('chai').expect
const assert = require('chai').assert
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

///////////////////////////////////////////
//sendToBack 
//Send.sendToBack("http://localhost:8000/fixTitleTask", body, "POST")
//const result = Send.sendToBack('/tasks', "", "GET");
const body = {
    idParent: 23,
    text:'sometext',
    id: 16
}

send.Send.sendToBack("/fixTitleTask", body, "POST")

app.post("/fixTitleTask", (req, res) => {
    console.log('i see you')
    res.send()
});

const PORT = 8000;
const server = app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server listening on port ${PORT}`);
});