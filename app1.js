var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var auth = require('./routes/auth');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Morgan ( debugger)
let morgan = require("morgan");
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'client/src/app')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/v1/', auth);

//Static Foldera for Angular build
app.use(express.static(__dirname + '/public/dist'));

//send all not known to Angular
app.all("*", (req, res, next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})


app.listen(3000, function() {
    console.log('Server Started on Port 3000...');
});

