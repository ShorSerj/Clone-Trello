const path = require("path")
const fs = require("fs")
// const express = require("express");

const router = app => {
    app.get('/', (request, response) => {
        app.use(express.static(__dirname + "/public"));
        console.log(request.url)
        response.set('Content-Type', 'text/html; charset=utf-8');
        const filePath =  path.resolve(__dirname, "../dist/index.html" )
        console.log(filePath)
        fs.readFile(filePath, 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            const content = data;
            response.send(content);
        });  
    });
    app.get('/tasks', (request, response) => {
        response.send(users);
    });
}

module.exports = router;