const express = require('express');
const routes = require('./routes/routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Use Node.js body parsing middleware
app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.json());

fs.createWriteStream(__dirname + 'createHistory.txt')

app.get('/tasks', (req, res) => {
    const fPath = path.resolve(__dirname, 'src/response.json')

    fs.readFile(fPath, (err, data) => {
        if (err) {
            throw err;
        }
        res.type('json').send(data)
    })
});

app.post('/fixTitleColumn', (req, res) => {
    let id = req.body
    for (let key in id) {
        // console.log(key + ": " + id[key]);
        fs.appendFile('createHistory.txt', key + ": " + id[key] + "   ", function (error) {
            if (error) throw error;
        });
    }
    res.send()
});

app.post('/fixTitleTask', (req, res) => {
    let id = req.body
    for (let key in id) {
        // console.log(key + ": " + id[key]);
        fs.appendFile('createHistory.txt', key + ": " + id[key] + "   ", function (error) {
            if (error) throw error;
        });
    }
    res.send()
});

const PORT = process.env.PORT || 8000;
// Start the server
const server = app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log(`Server listening on port ${PORT}`);
});