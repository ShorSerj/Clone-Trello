const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const Schema = mongoose.Schema;


const tasksScheme = new Schema({
    idUser: String,
    id: Number,
    idParent: Number,
    value: String
});

const usersScheme = new Schema({
    username: String,
    password: String,
    email: String
});

//Подключение
mongoose.connect("mongodb://localhost:27017/usersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const Tasks = mongoose.model("Tasks", tasksScheme);
const UsersScheme = mongoose.model("usersScheme", usersScheme);


app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('./dist'))
app.set('port', process.env.PORT || 3000)

app.use('/user/register', (req, res) => {
    let body = req.body
    let username = body.username

    const newAccount = new UsersScheme({
        username: body.username,
        password: body.password,
        email: body.email
    });

    UsersScheme.find({
        username
    }, function (err, docs) {
        if (err) return console.log(err);
        if (docs[0] && docs[0].username === username) {
            res.send('Error username')
        } else {
            newAccount.save()
                .then(function (docs) {
                    console.log("Сохранен объект1", docs)
                    res.send("Data fixed")
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    })
})

app.use('/user/login', function (req, res) {
    let body = req.body
    let username = body.username
    let email = body.username
    UsersScheme.find({
        username
    }, function (err, docs) {
        console.log(docs[0])
        let answer = {}
        if (err) {
            answer.code = 2
            answer.error = 'Ошибка в работе сайта, ошибка на back'
            res.send(answer)
        }
        if (docs[0]) {
            if (docs[0].password == body.password) {
                answer.code = 0
                answer.idUser = docs[0]._id
                console.log(answer)
                res.send(answer)
            } else {

                answer.code = 1
                answer.error = 'Логин или пароль не правильный'
                res.send(answer)
            }
        } else {
            UsersScheme.find({
                email
            }, function (err, docs) {
                if (docs[0]) {
                    if (docs[0].password == body.password) {
                        answer.code = 0
                        answer.idUser = docs[0]._id
                        console.log(answer)
                        res.send(answer)
                    } else {
                        answer.code = 1
                        answer.error = 'Логин или пароль не правильный'
                        res.send(answer)
                    }
                }
            })
        }
    })
})

app.use('/user/logout', function (req, res) {
    res.send('Logout successful')
})

app.post('/board/get', function (req, res) {
    let idUser = req.body.idUser
    Tasks.find({
        idUser
    }, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.use('/column/create', (req, res) => {
    let body = req.body

    const task = new Tasks({
        idUser: body.idUser,
        idParent: body.idParent,
        value: body.text
    });

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

app.use('/task/create', (req, res) => {
    let body = req.body

    const task = new Tasks({
        idUser: body.idUser,
        id: body.id,
        idParent: body.idParent,
        value: body.text
    });

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

app.use('/column/update', (req, res) => {
    let body = req.body

    Tasks.updateOne({
        idUser: body.idUser,
        idParent: body.idParent
    }, {
        value: body.text
    }, function (err, result) {
        if (err) return console.log(err)
        console.log('updated', result)
    })
    res.send("Data fixed")
});

app.use('/task/update', (req, res) => {
    let body = req.body

    Tasks.updateOne({
        idUser: body.idUser,
        id: body.id
    }, {
        value: body.text,
        idParent: body.idParent
    }, function (err, result) {
        if (err) return console.log(err)
        console.log('updated', result)
    })
    res.send("Data fixed")
});

app.use('/column/delete', (req, res) => {
    console.log(req.body)
    Tasks.remove({
        idUser: req.body.idUser,
        idParent: req.body.idParent
    }, function (err, result) {
        if (err) return console.log(err)
        res.send("Data deleted")
    })
});

app.use('/task/delete', (req, res) => {
    console.log(req.body)
    Tasks.remove({
        idUser: req.body.idUser,
        id: req.body.id,
        idParent: req.body.idParent
    }, function (err) {
        if (err) return console.log(err)
        res.send("Data deleted")
    })
});

app.use('/board/update', (req, res) => {
    let body = req.body
    let idUser = req.body[0].idUser
    Tasks.deleteMany({
        idUser
    }, function (err) {
        if (err) {
            return console.log(err)
        } else {
            body.forEach(function (item) {
                console.log('item', item)
                const task = new Tasks({
                    idUser: item.idUser,
                    idParent: item.idParent,
                    id: item.id || null,
                    value: item.value
                });
                task.save()
                    .then(function (doc) {
                        console.log("Сохранен объект", doc)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            })
        }
    })
    res.send("Data updated")
});

app.get('/test', function (req, res) {
    Tasks.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.use('/del', (req, res) => {
    Tasks.deleteMany({}, function (err) {
        if (err) return console.log(err)
        res.send("База очищена")
    })
})

app.listen(app.get('port'), () => {
    console.log(`Сервер запущен, ${app.get('port')}`)
})

module.exports = app