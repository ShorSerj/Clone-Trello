const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const Schema = mongoose.Schema;


const tasksScheme = new Schema({
    id: Number,
    idParent: Number,
    value: String
});

const createAccountScheme = new Schema({
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
const createAccount = mongoose.model("createAccount", createAccountScheme);


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

    const newAccount = new createAccount({
        username: body.username,
        password: body.password,
        email: body.email
    });

    newAccount.save()
        .then(function (doc) {
            console.log("Сохранен объект", doc)
        })
        .catch(function (err) {
            console.log(err)
            mongoose.disconnect()
        })
    res.send("Data fixed")
});


app.use('/logIn', function (req, res) {
    let body = req.body
    let username = body.username
    console.log(username)
    createAccount.find({
        username
    }, function (err, docs) {
        if (err) return console.log(err);
        if (docs[0]) {
            if (docs[0].password == body.password) {
                req.session.username = username
                res.cookie('username', username, {
                    maxAge: 900000,
                    httpOnly: true
                })
                res.send('Login successful: ' + 'sessionId: ' + req.session.id + '; username: ' + req.session.username)
            } else {
                res.send('Login error')
            }
        } else {
            console.log('Cookies: ', req.cookies)
            res.send('Login error')
        }
    })
})

app.use('/logOut', function (req, res) {
    let username = ""
    res.cookie('username', username, {
        maxAge: 900000,
        httpOnly: true
    })
    res.send('Login successful: ' + 'sessionId: ' + req.session.id + '; username: ' + req.session.username)
})

/////////////////////////////////////////////////////////////////////////////////
app.get('/testAccount', function (req, res) {
    createAccount.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs)
    })
})

app.get('/log', function (req, res) {
    if (req.cookies['username']) {
        console.log('true', req.cookies['username']);
        res.send('true')
    } else {
        console.log('false', req.cookies['username']);
        res.send('false')
    }
})

app.get('/board', function (req, res) {

    Tasks.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log('Cookies: ', req.cookies['username'])
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