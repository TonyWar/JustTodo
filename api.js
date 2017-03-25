var express = require('express');
var path = require('path'); // модуль для парсинга пути
var favicon = require('serve-favicon'); //для favicon.ico
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require("stylus");
var routes = require('./routes/index');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("DB connected");
});

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/icons/favicon.png')); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(logger('dev')); // выводим все запросы со статусами в консоль
app.use(bodyParser.json()); // стандартный модуль, для парсинга JSON в запросах
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/', routes); // модуль для простого задания обработчиков путей
app.use(stylus.middleware({
    force: true,
    src: __dirname + '/resources',
    dest: __dirname + '/public',
    debug: true
}));
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


app.get('/api', function(req, res) {
    res.send('API is running');
});

app.listen(1337, function() {
    console.log('Express server listening on port 1337');
});

app.use(function(req, res, next) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next) {
    next(new Error('Random error!'));
});