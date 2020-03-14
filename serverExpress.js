const express = require('express')
const app = express()
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
})
const advice = require('./libs/advice')


app.set('port', process.env.PORT || 3000)

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
    next()
})

app.get('/', function (req, res) {
    res.render('home', {
        advice: advice.getAdvice()
    })
})

app.get('/about', function (req, res) {
    res.render('about',{
        pageTestsScripts: '/qa/tests-about.js'
    })
})

app.get('/contacts', function (req, res) {
    res.render('about')
})

app.get('/task', function (req, res) {
    res.type('text/plain')
    res.send('Task')
})

app.use(function (req, res) {
    res.status(404)
    res.render('404')
})

app.use(function (req, res) {
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), () => {
    console.log(`Сервер запущен, ${app.get('port')}`)
})