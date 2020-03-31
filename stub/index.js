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
    console.log('i get!')
    // Tasks.find({}, function (err, docs) {
    //     if (err) return console.log(err);
    //     console.log(docs);
    //     res.send(docs)
    // })
    res.send(require('./task.json'))
})

app.get('/test', function (req, res) {
    Tasks.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.get('/testdel', function (req, res) {
    Tasks.remove({
        idParent: 200
    }, function (err, result) {
        if (err) return console.log(err)
        console.log(result)
    })
    Tasks.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.use('/fixTitleColumn', (req, res) => {
    let id = req.body
    console.log('______________________________________', id)
    // for (let key in id) {
    //     console.log(key + ": " + id[key]);
    //     fs.appendFile('createHistory.txt', key + ": " + id[key] + "   ", function (error) {
    //         if (error) throw error;
    //     });
    // }

    const task = new Tasks({
        id: null,
        idParent: id.idParent,
        value: id.text
    });
    task.updateOne({
        idParent: id.idParent
    }, {
        value: id.text
    }, function (err, result) {
        if (err) return console.log(err)
        console.log(result)
    })
    Tasks.find({
        idParent: 13
    }, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
    task.save()
        .then(function (doc) {
            console.log("Сохранен объект", doc)
        })
        .catch(function (err) {
            console.log(err)
            mongoose.disconnect()
        })
    res.send("Data fixed")
});

app.use('/fixTitleTask', (req, res) => {
    res.send("Data fixed")
});


app.listen(app.get('port'), () => {
    console.log(`Сервер запущен, ${app.get('port')}`)
})

module.exports = app