const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('./dist'))
app.set('port', process.env.PORT || 3000)

app.get('/tasks', function (req, res) {
    res.send(require('./task.json'))
})

app.use('/fixTitleColumn', (req, res) => {
    let id = req.body
    console.log('______________________________________',id)
    for (let key in id) {
        console.log(key + ": " + id[key]);
        fs.appendFile('createHistory.txt', key + ": " + id[key] + "   ", function (error) {
            if (error) throw error;
        });
    }
    res.send("Data fixed")
});


app.listen(app.get('port'), () => {
    console.log(`Сервер запущен, ${app.get('port')}`)
})

module.exports = app