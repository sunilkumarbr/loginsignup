var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongo = require("mongodb");


/*******************function for mongodb connection*********************/

var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('sunil', new mongo.Server(host, port),{safe:false});
db.open(function(err, db){
    if(err){
        console.log('MongoDB connection error:\n', err);
    }else{
        console.log("Connected to MONGODB server");
        db.collection("user",function(err,col){

	    	if(err){
	    		console.log("collection not found");
	    	}
	    	else{
	    		col.remove();
	    		console.log('All previous record for this website have been deleted\n(i.e, user accounts)');
	    	}
	    });
	}
    
});




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

	var col=db.collection('user');

	col.find({"username":name},function(err,cursor){
		if(err)
			console.log(err);
		else{
			// console.log(cursor);
			cursor.toArray(function(err,row){
				// console.log(row);
				// console.log(row[0]);
				 if(row[0]!==undefined)
				 	res.render('signup',{found:'username already exist'});
				 else{
					 	col.find({"email":email},function(err,cursor){
							if(err)
								console.log(err);
							else{
									cursor.toArray(function(err,row){
										if(row[0]!==undefined)
						 				res.render('signup',{found:'Email id already exist'});
						 				else{
						 					/****insert***/
						 					col.insert({
						 						username:name,
						 						email:email,
						 						password:password
						 					},function(err,insert){
						 						if(err)
						 							console.log(err);
						 						else{
						 							// console.log(insert);
						 							res.render('index',{user:'login in with your username and password'});
						 						}
						 					});
						 				}	
					 				});
					 			}
				 		});
				 }
			});
		}
	});
		
});


/*****post mathod for login******/ 
app.post('/login',function(req,res){

	var name=req.body.username;
		password=req.body.password;

	var col=db.collection('user');

	col.find({"username":name},function(err,cursor){
		if(err)
			console.log(err);
		else{
			cursor.toArray(function(err,row){
				 if(row[0]===undefined)
				 	res.render('index',{user:'invalid Username!!, Enter valid username.'});
				 else{
					 	col.find({"password":password},function(err,cursor){
							if(err)
								console.log(err);
							else{
								cursor.toArray(function(err,row){
									if(row[0]===undefined)
									res.render('index',{user:'password is not correct'});	
									else{
										
										console.log("password correct");
										sess=req.session;
										sess.user=req.body.username;
										res.redirect("/"+name);
									}

								});
									
							}
						});
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