const express = require('express');
const routes = require('./routes/routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Use Node.js body parsing middleware

app.use(express.static(__dirname + "/dist"));


    app.use('/tasks', (request, response) => {
        const fPath = path.resolve(__dirname, 'src/response.json')
        fs.readFile(fPath, (err,data) => {
            if (err) {
                throw err;
            }
            response.type('json').send(data)
        })
    });

    app.use('/', (request, response) => {

        console.log(request.url)
        response.set('Content-Type', 'text/html; charset=utf-8');
        const filePath =  path.resolve(__dirname, "dist/index.html" )
        console.log(filePath)
        fs.readFile(filePath, 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            const content = data;
            response.send(content);
        });  
    });
    
const PORT = process.env.PORT || 8000;
// Start the server
const server = app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log(`Server listening on port ${PORT}`);
});