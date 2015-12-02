var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql=require('mysql');


/*******************function for mysql connection*********************/
// function mysqlconnection(sql){
// 	sql=mysql.createConnection({ 
// 			host: 'devhosting.wiredelta.in',
// 			user:'institute.devhos',
// 			password: 'InstituteWD2014',
// 			database : 'wd_institute_dev'
// 		});
// 	return sql;
// }


function mysqlconnection(sql){
	sql=mysql.createConnection({ 
			host: '127.0.0.1',
			user:'root',
			password: '',
			database : 'user'
		});
	return sql;
}

/**************function to delete all record from mysql db ***********/
// var db=mysqlconnection(db);
//  db.connect(function(err){
// 	if(err){
// 		console.log("Not able to connect to server, Please Check your internet connection",err);
// 	}
// 	else{
// 		db.query('delete from Sunil;',function(err,desc){
// 			if(err)
// 				console.log("cannot able to acces table ",err);
// 			else
// 				console.log('All previous record for this website have been deleted\n(i.e, user accounts)');
// 		});
// 	}
// });

/***********************creating http server**********************/
var app = express(); 

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(session({secret: 'sunil'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.bodyParser());

var sess;
/*****get mathod for root path******/ 
app.get('/',function(req,res){
	sess=req.session;
	if(sess.user)
	{
	res.redirect('/'+sess.user);
	}
	else{
	res.render('index',{user:""});
	}
});

/*****get mathod for login******/ 
app.get('/login',function(req,res){
	sess=req.session;
	if(sess.user)
	{
	res.redirect('/'+sess.user);
	}
	else{
	res.render('index',{user:""});
	}
});

/*****get mathod for signup******/ 
app.get('/signup',function(req,res){
	sess=req.session;
	if(sess.user)
	{
	res.redirect('/'+sess.user);
	}
	else{
	res.render('signup',{found:''});
	}
});

/*****post mathod for signup******/ 
app.post('/signup',function(req,res){
	var name=req.body.name;
		email=req.body.email;
		password=req.body.password;

	var con=mysqlconnection(con);

	con.connect(function(err){
		if(err)
		{
			console.log('not able to connect, please check internet connection');
			
		}else{

			// console.log('connected to mysql');
			var selectByName='select * from Sunil where Username like "'+name+'";';
			con.query(selectByName,function(err,row){
				if(err){
						console.log(err);
					}else{
							// console.log(row);
							var message;
							if(row[0]===undefined)
							{
								var selectByEmail='select * from Sunil where UserEmail like "'+email+'";';
								con.query(selectByEmail,function(err,row){
									if(err){
										console.log(err);
									}
									else{
											if(row[0]===undefined)
												{
							
													var insert='insert into Sunil value('+0+',"'+email+'","'+name+'","'+password+'");';
													con.query(insert,function(err,row,col){
														if(err){
															console.log("insert error");
															console.log(err);
														}
														else{
															console.log("inserted sucessfully");
															res.render('index',{user:'login in with your username and password'});
															// message="inserted sucessfully";
															// console.log(row);
														}
												
													});
												}else
													res.render('signup',{found:'Email id already exist'});
										}
								});
							}
							else
								res.render('signup',{found:'username already exist'});
						}
			});

		}
	});
});


/*****post mathod for login******/ 
app.post('/login',function(req,res){

	var name=req.body.username;
		password=req.body.password;

		var connection=mysqlconnection(connection);

		connection.connect(function(err){
			if(err){
				console.log("cannot able to connect, please check internet connection");
			}else{
				var select='select * from Sunil where Username like "'+name+'";';
				connection.query(select,function(err,row){
					if(err){
						console.log("cannot access db");
					}else{
						if(row[0]===undefined)
							{
								console.log("user not found");
								res.render('index',{user:'invalid Username!!, Enter valid username.'});
							}else{
								if(password===row[0].password1){
									console.log("password correct");
									sess=req.session;
									sess.user=req.body.username;
									res.redirect("/"+name);
									}else{
										res.render('index',{user:'password is not correct'});
									}
								}
					}
				});
			}
		});
});

/*****get mathod for logout it will destroy the session******/ 
app.get('/logout',function(req,res){

	req.session.destroy(function(err){
	if(err){
	console.log(err);
	}
	else
	{
	res.redirect('/');
	}
	});

});

/*****get mathod for admin for whom the session is created******/ 
app.get('/*',function(req,res){
	sess=req.session;
	if(sess.user)
	{
	
		res.render('welcome',{admin:sess.user});
	}
	else
	{
	
		res.render('loginagain.html');
	}

});

/*****listen mathod for the server to set port******/ 
app.listen(3214,function(){
	console.log("Server running on PORT 3214");
});