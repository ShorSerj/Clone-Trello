const send = require('../src/sendToBack.js')
const expect = require('chai').expect
const assert = require('chai').assert
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/fixTitleTask', (req, res) => {
    // console.log(req.body)
    res.type('json').send(body)
});

const PORT = process.env.PORT || 8000;
// Start the server
const server = app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log(`Server listening on port ${PORT}`);
});
///////////////////////////////////////////
//sendToBack 
//Send.sendToBack("http://localhost:8000/fixTitleTask", body, "POST")
//const result = Send.sendToBack('/tasks', "", "GET");
const body = {
    idParent: 23,
    text:'sometext',
    id: 16
}
send.Send.sendToBack("http://localhost:8000/fixTitleTask", body, "POST")

