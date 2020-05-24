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


app.use(session({
    // storage: store,
    resave: false,
    saveUninitialized: true,
    secret: 'meggasupersecret'
}))

app.use(express.static('./dist'))
app.set('port', process.env.PORT || 3000)



app.use('/createAccount', (req, res) => {
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

app.use('/logIn', function (req, res) {
    let body = req.body
    let username = body.username
    UsersScheme.find({
        username
    }, function (err, docs) {
        let answer = {}
        if (err) return console.log(err);
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
            answer.code = 2
            answer.error = 'Ошибка в работе сайта, ошибка на back'
            res.send(answer)
        }
    })
})

app.use('/logOut', function (req, res) {
    res.send('Login successful: ' + 'sessionId: ' + req.session.id + '; username: ' + req.session.username)
})

/////////////////////////////////////////////////////////////////////////////////
app.get('/testAccount', function (req, res) {
    UsersScheme.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.get('/board', function (req, res) {
    let id = req.cookies['_id']
    Tasks.find({
        id
    }, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.use('/createColumn', (req, res) => {
    let body = req.body

    const task = new Tasks({
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

app.use('/createTask', (req, res) => {
    let body = req.body

    const task = new Tasks({
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

app.use('/updateColumn', (req, res) => {
    let body = req.body

    Tasks.updateOne({
        idParent: body.idParent
    }, {
        value: body.text
    }, function (err, result) {
        if (err) return console.log(err)
        console.log('updated', result)
    })
    res.send("Data fixed")
});

app.use('/updateTask', (req, res) => {
    let body = req.body

    Tasks.updateOne({
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


app.use('/deleteColumn', (req, res) => {
    console.log(req.body)
    Tasks.remove({
        idParent: req.body.idParent,
    }, function (err, result) {
        if (err) return console.log(err)
        res.send("Data deleted")
    })
});

app.use('/deleteTask', (req, res) => {
    console.log(req.body)
    Tasks.remove({
        id: req.body.id,
        idParent: req.body.idParent
    }, function (err, result) {
        if (err) return console.log(err)
        res.send("Data deleted")
    })
});

app.use('/updateBoard', (req, res) => {
    let body = req.body
    Tasks.deleteMany({}, function (err) {
        if (err) return console.log(err)
        body.forEach(function (item) {
            const task = new Tasks({
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
                    mongoose.disconnect()
                })
        })
    })
    res.send("Data fixed")
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