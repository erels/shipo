var mysql = require('mysql');

var pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASS,
    // database: process.env.MYSQL_DB,
    host: 'localhost',
    user: 'commerceintegrated',
    password: 'commerceintegrated',
    database: 'worldtrans',
    connectionLimit: 50
});

exports.getRecords = function(sql, params, callback) {
    //var sql = "SELECT name FROM users WHERE city=?";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, params, function(err, results) {
        	console.log ('-------------------');
        	console.log ('SQL=',sql);
        	console.log ('DB_Param=',params);
        	console.log ('DB_err=',err);
        	console.log ('DB=',results);
        	console.log ('-------------------');
            connection.release();
            if (err) {
                console.log(err);
            callback(true);
            return;
            }
            callback(false, results);
        });
    });
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'commerceintegrated',
        password: 'commerceintegrated',
        connectionLimit: 100,
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    })

    state.mode = mode
    done()
}

exports.get = function(sql, paramas) {
    //return state.pool
    state.pool.query(sql, paramas, function(err, rows) {

        if (err) return done(err)
        done(null, rows)
    })
}