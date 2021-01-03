/*  RESTFUL SERVICES BY NODEJS */

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');


//connect to mysql
var con = mysql.createConnection({
	host: 'localhost' ,
	user:  'root' ,
	password: '',
	database: 'nodeapp'
})


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('images'));
require('events').EventEmitter.defaultMaxListeners = 0;

//connect to database
con.connect((err) =>{
	if(err) throw err;
	console.log('Mysql Connected...');
  });


 //register query
 app.post('/register/', (req,res,next) => {  

	var post_data = req.body;  //get POST PARAMS
	var user_id = post_data.user_id;
	var name = post_data.name;
	var lastname = post_data.lastname;
	var email = post_data.email;
	var password = post_data.password;
	var phone = post_data.phone;
	console.log(post_data);
	con.query('SELECT* FROM user where email=?', [email] , function(err,result,fields) { 
		con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
	
	if(result && (result.length > 0) ){
	res.json("EXIST");
	}
	else 
	{
			con.query(' INSERT INTO `user`(`name`, `lastname`, `email`, `password`, `phone`) VALUES (?,?,?,?,?)', [name,lastname,email,password,phone], function(err,result,fields){
				 con.on('error',function (err) { 
					   console.log('mysql error',err);
					   res.json("register failed ");
				} );
				
				res.json("OK");	
			})
	}
																			
	   });
	})
	

	//show single user
app.get('/user/get',(req, res) => {
	var User = {
		user_id : 0 ,
		name : '',
		lastname : '',
		email : '',
		password : '',
		phone : ''
	};
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var email = post_data.email;
		con.query('SELECT* FROM user where email=?', [email] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
			if(result && result.length ){
			res.send(result[0]);
			}
			else
			{
				res.send(User);
			}
			
			});

  });

  
	//login query
	app.post('/login/', (req,res,next) => {  
	
		var User = {
			user_id : 0 ,
			name : '',
			lastname : '',
			email : '',
			password : '',
			phone : ''
		};

		var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var email = post_data.email;
		var password = post_data.password;

		con.query('SELECT* FROM user where email=? and password=?', [email,password] , function( err ,result, fields) { 
		
		con.on('error',function (err) { 
		console.log('mysql error',err);
		} );
		
		if(result && result.length ){
		res.send(result[0]);
		}
		else
		{
			res.send(User);
		}
		});
		
		})





//show all locations
app.post('/records/add',(req, res) => {

	
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.user_id;
		var address = post_data.address;
		var distance = post_data.distance;
		var time = post_data.time;
		var daterecord = post_data.daterecord;
		
		console.log(post_data);

  
		con.query('INSERT INTO `record`(`address`, `time`, `distance`, `daterecord`,`user_id`) VALUES (?,?,?,?,?)', [address,time,distance,daterecord,id] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
		
			res.json("OK");
		
			});

  });


  //show all events
app.post('/events/add',(req, res) => {

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var address = post_data.adresse_evt;
		var title = post_data.event_title;;
		var date = post_data.date_evt;
		var time = post_data.time_evt;
		var user = post_data.user;
		console.log(post_data);

		con.query('INSERT INTO `event`(`event_title`,`adresse_evt`, `date_evt`, `time_evt`, `user`) VALUES (?,?,?,?,?)', [title,address,date,time,user] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			res.json("OK");
			});

  });




//add  location
app.post('/location/add',(req, res) => {

	
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var user = post_data.user_id;
                 var bike = post_data.bike_id;
		var adress = post_data.adresselocation;
		var date = post_data.datelocation;
		var hours = post_data.hours;
                 var totalprice = post_data.totalprice;
                 
		
		
		console.log(post_data);

  
		con.query('INSERT INTO `location`( `datelocation`, `adresselocation`, `totalprice`, `hours`, `bike_id`, `user_id`) VALUES (?,?,?,?,?,?)', [date, adress, totalprice,
hours, bike, user ] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
		
			res.json("OK");
		
			});

  });





//show all locations
app.post('/locations',(req, res) => {

	var Location = {
		location_id : 0 ,
		datelocation : '',
		adresselocation : '',
		user_id : 0,
		bike_id : 0
		
	};

	var data = [Location];

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.user_id;
		var name = post_data.name;
		var lastname = post_data.lastname;
		var email = post_data.email;
		var password = post_data.password;
		var phone = post_data.phone;
		console.log(post_data);

  
		con.query('SELECT  * FROM location,bike,shop WHERE location.bike_id = bike.bike_id AND location.user_id=?  GROUP BY location.location_id', [id] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
			if(result && result.length ){
			res.send(JSON.stringify(result));
			}
			else
			{
				res.send(data);
			}
			});

  });






//show all locations
app.post('/records/get',(req, res) => {

	var Record = {
		record_id : 0 ,
		address : '',
		daterecord : '',
		time : '',
        distance: '',
		user_id : ''
		
	};

	var data = [Record];

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.user_id;
		
		console.log(post_data);

  
		con.query('SELECT * FROM record WHERE user_id=?', [id] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
			if(result && result.length ){
			res.send(JSON.stringify(result));
			}
			else
			{
				res.send(data);
			}
			});

  });






//show all locations
app.post('/records/delete',(req, res) => {

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.record_id;
		console.log(post_data);
		con.query('DELETE FROM record WHERE record_id=?', [id] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
			res.json("OK");
		
			});

  });



  
//delete rent
app.post('/locations/delete',(req, res) => {

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.location_id;		
		console.log(post_data);

		con.query('DELETE FROM location WHERE location_id=?', [id] , function( err ,result, fields) { 		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			res.json("OK");
		});

  });






  //show single location
app.get('/location/:id',(req, res) => {
	let sql = "SELECT * FROM location WHERE location_id="+req.params.id;
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(JSON.stringify(results));
	});
  });





//participate
app.post('/participate',(req, res) => {
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var event = post_data.event_id;
		var user = post_data.user;

		console.log(post_data);

	con.query('INSERT INTO `participants`(`puser_id`, `pevent_id`) VALUES (?,?)', [user, event] , function( err ,result, fields) { 
		con.on('error',function (err) { 
			res.send("ERROR");
		console.log('mysql error',err);
		} );
	res.send("OK");
  });


});


//update user
app.put('/user/update',(req, res) => {
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var name = post_data.name;
		var lastname = post_data.lastname;
		var email = post_data.email;
		var password = post_data.password;
		var phone = post_data.phone;
		console.log(post_data);

	con.query('UPDATE user SET name=? , lastname=? , password=? , phone= ? WHERE email = ?  ', [name,lastname,password,phone,email] , function( err ,result, fields) { 
		
		con.on('error',function (err) { 
			res.send("ERROR");
		console.log('mysql error',err);
		} );
		
	res.send("OK");
  });


});


  //show all users
app.get('/users',(req, res) => {
	let sql = "SELECT * FROM user";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(JSON.stringify(results));
	});
  });


  //show single user
app.get('/user/:id',(req, res) => {
	let sql = "SELECT * FROM user WHERE user_id="+req.params.id;
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(JSON.stringify(results));
	});
  });


  //show all bikes
app.get('/bikes',(req, res) => {
	let sql = "SELECT * FROM bike";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });
  
   //show all bikes
app.get('/bikes/sh',(req, res) => {
	let sql = "SELECT * FROM bike,shop";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });

  

//show all participants
app.post('/participants/alls',(req, res) => {
	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.event_id;
		console.log(post_data); //AND participant.puser_id = user.user_id  GROUP BY participant.pevent_id WHERE  participant.pevent_id=? ', [id]
	
con.query('SELECT DISTINCT * FROM participants, user  WHERE participants.pevent_id=? AND user.user_id = participants.puser_id', [id] , function( err ,result, fields) { 
		
		con.on('error',function (err) { 
		console.log('mysql error',err);
		} );
		
		if(result && result.length ){
		res.send(JSON.stringify(result));
		}
		else
		{
			res.send(null);
		}
		});


  });


//show all bikes by shop
app.post('/bikes/shops',(req, res) => {

	var Bike = {
		bike_id : 0 ,
		model : '',
		type : '',
		price : '',
		shop_id : 0
	};

	var data = [Bike];

	var post_data = req.body;  //get POST PARAMS
		//retrieve data from query
		var id = post_data.shop_id;
		
		console.log(post_data);

		con.query('SELECT * FROM bike WHERE shop_id=?', [id] , function( err ,result, fields) { 
		
			con.on('error',function (err) { 
			console.log('mysql error',err);
			} );
			
			if(result && result.length ){
			res.send(JSON.stringify(result));
			}
			else
			{
				res.send(data);
			}
			});

  });




 //show all shops
 app.get('/events/all',(req, res) => {
	let sql = "SELECT * FROM event";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });




 //show all shops
 app.get('/shops',(req, res) => {
	let sql = "SELECT * FROM shop";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });

  //show all communities
 app.get('/communities',(req, res) => {
	let sql = "SELECT * FROM community";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });

  //show all cyclists
 app.get('/cyclists',(req, res) => {
	let sql = "SELECT * FROM cyclist";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });

  //show all communities
 app.get('/circuits',(req, res) => {
	let sql = "SELECT * FROM circuit";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });





  
  //show single bike
app.get('/bike/:id',(req, res) => {
	let sql = "SELECT * FROM bike WHERE bike_id="+req.params.id;
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });
  





  //Server listening
app.listen(3000,() =>{
	console.log('Server started on port 3000...');
  });







//register query
/*app.post('/register/', (req,res,next) => {  

var post_data = req.body;  //get POST PARAMS
var name = post_data.name;
var lastname = post_data.lastname;
var email = post_data.email;
var password = post_data.password;
var phone = post_data.phone;

con.query('SELECT* FROM user where email=?', [email] , function(err,resut,fields) { 

con.on('error',function (err) { 
console.log('mysql error',err);
} );

if(result && result.length )
res.json('USER ALREADY EXIST  !');
else
{
	con.query(' INSERT INTO `user`(`name`, `lastname`, `email`, `password`, `phone`) VALUES (?,?,?,?,?)', [name,lastname,email,password,phone], function(err,result,fields){
		con.on('error',function (err) { 
			console.log('mysql error',err);
			res.json("register failerd ");
			} );
			res.json("register successful");
	} )
}


} );

})



//login query
app.post('/login/', (req,res,next) => {  


	var post_data = req.body;  //get POST PARAMS
	//retrieve data from query
	var email = post_data.email;
	var password = post_data.password;
	
	
	con.query('SELECT* FROM user where email=? and password=?', [email,password] , function(err,resut,fields) { 
	
	con.on('error',function (err) { 
	console.log('mysql error',err);

	} );
	
	
	if(result && result.length )
	res.json('USER ALREADY EXIST  !');
	else
	{
		res.json('User do not exist');
	}
	

	} );
	
	})



app.listen(3000, () => {
	console.log('listen web Restful running on port 3000');
} )



*/


