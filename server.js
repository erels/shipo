let express = require("express");
let app = express();




const path = require("path");

//Body Parser
let BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

//Static Folder
app.use(express.static(__dirname + '/public/dist'));

//Morgan ( debugger)
let morgan = require("morgan");
app.use(morgan('dev'));

//mysql Database
/* 
let mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'commerceintegrated',
    password: 'commerceintegrated',
    database: 'worldtrans'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

 */
var db = require("./db.js");

app.use(function(req, res, next) {

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


//Routes
//
//
app.post("/blah",(req, res, next) => {
	console.log(req.body);      // your JSON
	return (req.body); 

})

//Get user
app.post("/user",(req, res, next) => {
	console.log(request.body);      // your JSON
    console.log("Server > Post '/user' ", req.body);
    /* connection.query('SELECT * FROM users', function(err, results) {
        if (err) throw err
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].full_name)
        console.log(results[0].password)
        console.log(results)
        return res.json(results);
    }) */
    var sql = 'Update users set uuid = UUID_SHORT(), lastin = NOW() where email = ? and password = ?';
    db.getRecords(sql, [req.body.email, req.body.password], function(err, results) {
        if (err) throw err
        console.log('results', results);
        if (results.affectedRows == 0) return results;
    });

    var sql = 'SELECT * FROM users where email = ? and password = ?';
    console.log("Server > Post '/user' ", req.body);
    db.getRecords(sql, [req.body.email, req.body.password], function(err, results) {
        if (err) throw err
        return res.json(results);
    });



})


//Get users
app.get("/users", (req, res, next) => {
    console.log("Server > Get '/users' ");
    /* connection.query('SELECT * FROM users', function(err, results) {
        if (err) throw err
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].full_name)
        console.log(results[0].password)
        console.log(results)
        return res.json(results);
    }) */
    var sql = 'SELECT * FROM users';
    db.getRecords(sql, [], function(err, results) {
        console.log(results);
        if (err) throw err
        return res.json(results);
    });



})

//Create user
app.post("/users", (req, res, next) => {
    console.log("Server > Post '/users' ", req.body);
    User.create(req.body, (err, users) => {
        if (err) return res.json(err)
        else return res.json(users);
    })

})

//Destroy user
app.delete("/users/:delId", (req, res, next) => {
    console.log("Server > DEL '/users/:id' > ID ", req.params.delId);
    User.deleteOne({ _id: req.params.delId }, (err, data) => {
        if (err) return res.json(err)
        else return res.json(data);
    })

})

//update user
app.put("/users/:id", (req, res, next) => {
    console.log("Server > PUT '/users/:id' > ID ", req.params.id);
    console.log("Server > PUT '/users/:id' > User ", req.body);




})



//send all not known to Angular
app.all("*", (req, res, next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})

app.listen(1337, () => console.log("Server joging at 1337"));
