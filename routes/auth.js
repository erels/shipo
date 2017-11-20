var express = require('express');
var db = require("../db.js");

var router = express.Router();

var uuidMap = new Map();

var FlakeIdGen = require('flake-idgen')
    , intformat = require('biguint-format')
    , generator = new FlakeIdGen;

//get try
//------------------------------
router.get('/try', function(req, res, next) {
	var cars = ["Saab", "Volvo", "BMW"];
            res.json(cars);
});

//post try
//--------------------------------
router.post('/try', function(req, res, next) {
	var fruits = ["Banana", "Orange", "Apple", "Mango"];
            res.json(fruits);
});
//post user new
//-----------------------------------
router.post('/user', function(req, res, next) {
	// console.log(req.body); // your JSON
	console.log("Server > Post '/user' ", req.body);
	if (req.body.email && req.body.password ) {
		var uuid = generator.next();

		var sql = 'SELECT * FROM users where email = ? and password = ?';
		db.getRecords(sql, [ req.body.email.toString(), req.body.password.toString() ], function(err, results) {
			if (err)
				throw err
				
				if ( results.length > 0){
					
					// delete old uid to invalidate other session from cashe in case login from multi browsers
					uuidMap.delete(results[0].uuid);
					
					var newUid = 'E' + intformat(uuid, 'dec').toString() + 'S';
					results[0].uuid = newUid;
					var sql = 'Update users set uuid = ?, lastin = NOW() where email = ? and password = ?';
					db.getRecords(sql, [ newUid, req.body.email, req.body.password ], function(err, results1) {
						if (err)
							throw err
						console.log('results after Q = ', results1);
						if (results1.affectedRows == 1) {
							if (add_to_hash (results)){
								return res.json(results[0]);
							}
						}
							


						
					});
					
				}else {
					return results;
				}		
					
			
		});	
		
		
		
	} else {
		console.log("Missing input value");
		//return res.json({error: "No input data"});
		res.statusMessage = "Password does not match";
		res.status(400).end();
	}
});

//----------------------------------
//post userOld
//-----------------------------------
router.post('/userOld', function(req, res, next) {
	// console.log(req.body); // your JSON
	console.log("Server > Post '/user' ", req.body);
	if (req.body.email && req.body.password ) {
		var uuid = generator.next();


		// var sql = 'Update users set uuid = UUID_SHORT(), lastin = NOW() where email = ? and password = ?';
		var sql = 'Update users set uuid = ?, lastin = NOW() where email = ? and password = ?';
		db.getRecords(sql, [ 'E' + intformat(uuid, 'dec').toString() + 'S', req.body.email, req.body.password ], function(err, results) {
			if (err)
				throw err
				console.log('results after Q = ', results);
			if (results.affectedRows == 0) 
				return results;


			var sql = 'SELECT * FROM users where email = ? and password = ?';
			db.getRecords(sql, [ req.body.email.toString(), req.body.password.toString() ], function(err, results) {
				if (err)
					throw err			
				if (add_to_hash (results)){
					return res.json(results[0]);
				}
			});	
		});
	} else {
		console.log("Missing input value");
		//return res.json({error: "No input data"});
		res.statusMessage = "Password does not match";
		res.status(400).end();
	}
});

//----------------------------------
function add_to_hash (res) {
	console.log('results=', res);
	if ( res.length > 0) {
		delete res[0].password
		var txt = JSON.stringify(res[0]);
		console.log('uuid=', JSON.parse(txt).uuid);
		uuidMap.set(JSON.parse(txt).uuid, txt);

		console.log('uuidMap', uuidMap);
		return true;
	}

	return false;
}
//---------
function update_hash (uid) {
	
	var sql = 'SELECT * FROM users where uuid = ?';
	console.log('Checking db ...', sql, uid);
	results = '';
	db.getRecords(sql, [ uid.toString() ] , function(err, results) {
		if (err)
			throw err
			
		uuidMap.delete(uid);
		if (add_to_hash (results)){
				console.log ('Finished update_hash');
			}
			

	});
}
	
	

//---------getprofile
router.post('/getprofile', function(req, res, next) {
	console.log("Server > Post '/getprofile' ", req.body);
	// res.json(req.body);
	obj = JSON.parse(uuidMap.get(req.body.uid));
	delete obj.id;
	delete obj.uuid;
	// console.log('OBJ', obj);
	var mapUserValue = JSON.stringify(obj);
	// var mapUserValue = uuidMap.get(req.body.uid);
	if (mapUserValue){
		
		console.log('AfterM= ', mapUserValue);
		// user in cashe , return true
		// console.log('TRUE');
		// return res.json('TRUE')
		
		res.send(mapUserValue);
		
	}else {
		console.log("getProfile: uuid not in cache");
		//return res.json({error: "No input data"});
		res.statusMessage = "ERROR: Can not recognize user";
		res.status(400).end();
	}
});
//------------validateUser---------------------
router.post('/validateUser', function(req, res, next) {
	console.log("Server > Post '/validateUser' ", req.body);
	// res.json(req.body);
	var mapUserValue = uuidMap.get(req.body.uid);
	if (mapUserValue){
		console.log('AfterM= ', mapUserValue);
		// user in cashe , return true
		// console.log('TRUE');
		// return res.json('TRUE')
		
		res.send(mapUserValue);
		
	} else {
		// user is not in cashe , check uuid in db
		// console.log('Checking db ...');
		var sql = 'SELECT * FROM users where uuid = ?';
		console.log('Checking db ...', sql);
		results = '';
		db.getRecords(sql, [ req.body.uid.toString() ] , function(err, results) {
			if (err)
				throw err
				
				console.log('AfterQ= ', results);
				if (add_to_hash (results)){
					delete results[0].password;
					return res.json(results[0]);
				}
				

		});

	}
});

//----------------------------------
router.post('/logout', function(req, res, next) {
	console.log("Server > Post '/logout' ", req.body);
	console.log('uuidMapB4---', uuidMap);
	uuidMap.delete(req.body.uid);
	console.log('uuidMapAfter---', uuidMap);
	var sql = 'Update users set uuid = null, lastin = NOW() where uuid = ?';
	db.getRecords(sql, [ req.body.uid], function(err, results) {
		if (err)
			throw err
		console.log('results after Q = ', results);
		
		return res.json(results);
	});
		
		
});

//------------updaShippingDesc------------------
router.post('/updashippingdesc', function(req, res, next) {
	console.log("Server > Post '/updashippingdesc' ", req.body);
	sql = 'update orders set customerdeclarevalue = ? ,customerdeclaretxt = ? where id = ? ';
	db.getRecords(sql, [ req.body.orderValue, req.body.orderDesc, req.body.id], function(err, results) {
		console.log('res=', results.affectedRows, results);
		
		if (results.affectedRows > 0) {
			var jsonret = JSON.stringify({"update": results.affectedRows});
			console.log ('jsonret=====', jsonret);
			// return res.json(jsonret);
			return res.send(jsonret);
		}
	});
	
});

//-------updateAddressChange---------------------------
router.post('/updateAddressChange', function(req, res, next) {
	console.log("Server > Post '/updateAddressChange' ", req.body);
	sql = 'update orders set shiptoname = ? ,address = ?,city = ?, zip = ?,country = ?, phone = ?   where id = ? ';
	db.getRecords(sql, [ req.body.shiptoname, req.body.address,req.body.city, req.body.zipcode, req.body.country, req.body.phone, req.body.id], function(err, results) {
		console.log('res=', results.affectedRows, results);
		
		if (results.affectedRows > 0) {
			var jsonret = JSON.stringify({"update": results.affectedRows});
			console.log ('jsonret=====', jsonret);
			// return res.json(jsonret);
			return res.send(jsonret);
		}
	});
	
});
//-------updateProfileChange---------------------------------
router.post('/updateProfileChange', function(req, res, next) {
	console.log("Server > Post '/updateProfileChange' ", req.body);
	var mapUserValue = uuidMap.get(req.body.uid);
	if (mapUserValue) {
		sql = 'update users set email = ? ,fname = ?, lname= ?, address = ?, city = ?, zip = ?,country = ?, phone = ?   where uuid = ? ';
		db.getRecords(sql, [ req.body.email, req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.zipcode, req.body.country, req.body.phone, req.body.uid ], function(err, results) {
			console.log('res=', results.affectedRows, results);

			if (results.affectedRows > 0) {
				
				update_hash (req.body.uid);
				
				var jsonret = JSON.stringify({
					"update" : results.affectedRows
				});
				console.log('jsonret=====', jsonret);
				// return res.json(jsonret);
				return res.send(jsonret);
			} else {
				console.log(results);

				res.statusMessage = results.message;
				res.status(400).end();
			}
		});
	}else {
		console.log(results);

		res.statusMessage = 'Can not find user';
		res.status(400).end();
	}

});
//-------whinsertorder---------------------------------
router.post('/whinsertorder', function(req, res, next) {
	console.log("Server > Post '/WHinsertOrder' ", req.body);
	obj = JSON.parse(uuidMap.get(req.body.uid));
	whUserId = obj.id;
	console.log ('whUserId',whUserId);
	if (whUserId) {
		var userAddress;
		var userCity;
		var userCountry;
		var userPhone
		var userZip;
		var userLname;
		var userFname;
		//get User default shipping address
		var sql = 'SELECT * FROM users where id = ?';
		results = '';
		db.getRecords(sql, [ req.body.id ] , function(err, results) {
			if (err){
				throw err
			} else {	
			console.log('AfterQ= ', results);
			userAddress = results[0].address;
			userCity = results[0].city;
			userCountry = results[0].country;
			userPhone = results[0].phone;
			userZip = results[0].zip;
			userName = results[0].lname + ' ' +  results[0].fname;
			dim = req.body.lin + 'X' + req.body.win + 'X' + req.body.hin
			// Insert the order
			sql = 'insert into orders (ReciveDate, name, Weghit, Dimention, Notes, userid, address, city , country, zip , shiptoname , phone, recievedby) values ( NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				
			db.getRecords(sql, [  req.body.name, req.body.weight, dim, req.body.orderDesc, req.body.id, userAddress, userCity, userCountry, userZip, userName, userPhone, whUserId ], function(err, res) {
						// console.log('res=', res.affectedRows, res);
						if (res.affectedRows > 0) {
								var jsonret = JSON.stringify({
									"Insert" : results.affectedRows
								});
								// console.log('jsonret=====', jsonret);
								// return res.json(jsonret);
								return res.send(jsonret);
						} else {
							console.log(res);

							res.statusMessage = res.message;
							res.status(400).end();
						}
			
			

		});
			}	
		
		});
		
	}else {
		// console.log(results);

		res.statusMessage = 'Can not find user';
		res.status(400).end();
	}

});
//----------------Register------------------

router.post('/register', function(req, res, next) {
	console.log("Server > Post '/Register' ", req.body);
	if (req.body.username && req.body.password ) {

		// 1. Check if email exist already
		//    If email exists , notify user
		var sql = 'SELECT * FROM users where email = ?';
		db.getRecords(sql, [ req.body.username.toString() ], function(err, results) {
			if (err)
				throw err			
				if ( results.length > 0) {
					//return res.json(results[0]);
					console.log("User with this email already exist");
					//return res.json({error: "No input data"});
					res.statusMessage = "User with this email already exist";
					res.status(400).end();
				} else {
					// 2. Register and create a session
					//console.log("About to register");
					var uid = 'E' + intformat(generator.next(), 'dec').toString() + 'S';
					//console.log ('uuid=', uid);
					sql = 'insert into users (email, password, fname, lname, address, city, phone, zip, country, uuid, lastin) values (?,?,?,?,?,?,?,?,?,?, NOW() )';
					db.getRecords(sql, [ req.body.username.toString(), req.body.password, req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.phone, req.body.zipcode, req.body.country, uid ], function(err, results) {
						console.log('res=', results.affectedRows, results);
						
						if (results.affectedRows > 0) {
							var jsonret = JSON.stringify({"uuid": uid, "lname": req.body.lname, "fname": req.body.fname});
							console.log ('jsonret=====', jsonret);
							// return res.json(jsonret);
							return res.send(jsonret);
						}
					});	

				}

		});
	}
});
//----------GetOrders-------------------------
router.post('/getorders', function(req, res, next) {
	console.log("Server > Post '/getorders' ", req.body);
	// res.json(req.body);
	var mapUserValue = uuidMap.get(req.body.uid);
	if (mapUserValue){
		console.log('AfterM= ', mapUserValue);
		console.log('UserId= ', JSON.parse(mapUserValue).id);
		
	var sql = 'SELECT id, Name, date_format(ReciveDate, "%Y-%m-%d") ReciveDate, Weghit, Dimention, date_format(ShipDate, "%Y-%m-%d") ShipDate, Carrier, Tracking, Notes FROM orders where userid = ?';
				console.log('Checking db ...', sql);
				results = '';
				db.getRecords(sql, [ JSON.parse(mapUserValue).id ] , function(err, results) {
					if (err)
						throw err
					
				
					
					console.log('AfterQ= ', results);
						
							
					return res.json(results);
						
						

				});
		// user in cashe , return true
		// console.log('TRUE');
		// return res.json('TRUE')
		
		//res.send(mapUserValue);
		
	} else {
		// user is not in cashe , check uuid in db
		// console.log('Checking db ...');
		console.log("Can not recognize user !!!!");
		//return res.json({error: "No input data"});
		res.statusMessage = "Not a vlaid request";
		res.status(400).end();

	}
});


//-----------------------------------
//----------GetOrdersForShipments-------------------------
router.post('/getordersforshipment', function(req, res, next) {
	console.log("Server > Post '/getordersforshipment' ", req.body);
	// res.json(req.body);
	var mapUserValue = uuidMap.get(req.body.uid);
	if (mapUserValue){
		console.log('AfterM= ', mapUserValue);
		console.log('UserId= ', JSON.parse(mapUserValue).id);
		
	var sql = 'SELECT id, Name, date_format(ReciveDate, "%Y-%m-%d") ReciveDate, Weghit, Dimention, date_format(ShipDate, "%Y-%m-%d") ShipDate, Carrier, Tracking, Notes, shiptoname, address, city, phone, zip, country, customerdeclarevalue, customerdeclaretxt FROM orders where userid = ? and (carrier is null or  carrier = "")' ;
				console.log('Checking db ...', sql);
				results = '';
				db.getRecords(sql, [ JSON.parse(mapUserValue).id ] , function(err, results) {
					if (err)
						throw err
					
				
					
					console.log('AfterQ= ', results);
						
							
					return res.json(results);
						
						

				});
		// user in cashe , return true
		// console.log('TRUE');
		// return res.json('TRUE')
		
		//res.send(mapUserValue);
		
	} else {
		// user is not in cashe , check uuid in db
		// console.log('Checking db ...');
		console.log("Can not recognize user !!!!");
		//return res.json({error: "No input data"});
		res.statusMessage = "Not a vlaid request";
		res.status(400).end();

	}
});
//------------getusernames-----------
//send userId and email , use for identify package owner by WH receiver
router.post('/getusernames', function(req, res, next) {
	console.log("Server > Post '/getusernames' ", req.body);
	if (uuidMap.get(req.body.uid)) {
		var sql = 'SELECT id, email , fname , lname from users';
		results = '';
		db.getRecords(sql, null , function(err, results) {
			if (err)
				throw err
			
			// console.log('AfterQ= ', results);
			return res.json(results);
		});
	}
	else {
		// user is not in cashe , check uuid in db
		// console.log('Checking db ...');
		console.log("Can not recognize user !!!!");
		//return res.json({error: "No input data"});
		res.statusMessage = "getusername can not recignize user";
		res.status(400).end();
		
			
	}

});
//-----------------------------------

// Get All Todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });

});

// Get Single Todo
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result) {
            if (err) {
                res.send(err);
		console.log('Serveor saving data rrrrrrrrrrrrrrrrrrrrrr...' + err);

            } else {
		console.log('No error ' + err);

                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;

