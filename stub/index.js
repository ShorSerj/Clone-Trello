const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Установка схемы
const tasksScheme = new Schema({
    id: Number,
    idParent: Number,
    value: String
});

//Подключение
mongoose.connect("mongodb://localhost:27017/usersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const Tasks = mongoose.model("Tasks", tasksScheme);

app.use(bodyParser.json());

app.use(express.static('./dist'))
app.set('port', process.env.PORT || 3000)

app.get('/tasks', function (req, res) {
    res.send(require('./task.json'))
})

app.get('/test', function (req, res) {
    Tasks.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.use('/fixTitleColumn', (req, res) => {
    console.log('req', req.body)
    let body = req.body

    const task = new Tasks({
        id: body.id,
        idParent: body.idParent,
        value: body.text
    });

    task.updateOne({
        idParent: body.idParent
    }, {
        value: body.text
    }, function (err, result) {
        if (err) return console.log(err)
        console.log('updated', result)
    })
    task.save()
        .then(function (doc) {
            console.log("Сохранен объект", doc)
        })
        .catch(function (err) {
            console.log(err)
            mongoose.disconnect()
        })
        console.log('all good')
    res.send("Data fixed")
});

app.use('/fixTitleTask', (req, res) => {
    
    res.send("Data fixed")
});

app.use('/deleteElement', (req, res) => {
    console.log(req.body)
    Tasks.remove({
        id: req.body.id,
        idParent: req.body.idParent,
        value: req.body.value
    }, function (err, result) {
        if (err) return console.log(err)
        console.log(result)
    })
});
// app.get('/testdel', function (req, res) {
//     Tasks.remove({}, function (err, result)
//     Tasks.find({}, function (err, docs) {
//         if (err) return console.log(err);
//         console.log(docs);
//         res.send(docs)
//     })
// })
app.listen(app.get('port'), () => {
    console.log(`Сервер запущен, ${app.get('port')}`)
})

module.exports = app