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

  
  //show single bike
app.get('/bike/:id',(req, res) => {
	let sql = "SELECT * FROM bike WHERE bike_id="+req.params.id;
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(results);
	});
  });
  

//show all locations
app.get('/locations',(req, res) => {
	let sql = "SELECT * FROM location ";
    con.query(sql, (err, results) => {
	  if(err) throw err;
	  res.send(JSON.stringify(results));
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

