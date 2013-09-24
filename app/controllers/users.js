var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 ,querystring = require('querystring')
 , global = require('../../global.js')

exports.login = function(req,res){
	if(req.user){
		global.id = req.user.id;
		global.email = req.user.email;
		console.log(req.user);
		res.send(req.profile);
		res.render('index' , {user : req.user.id});
	}
	else{
		res.render('login')
	}
}

exports.emails = function(req,res){
	User.findOne({googleID : req.user.id},function(err, user){
		res.send(user.SentEmails);
	})
}

function noNumberParse(foodItems) {
	var foodItemsObject = [];
	for  (var item in foodItems){
		console.log(foodItems[item]);
		var tempnumber = foodItems[item].match(/[0-9]/g);
		if(tempnumber){
			var temp = foodItems[item].split(/[0-9]/)
			temp[0]  = temp[0].replace(" " , "");
			var tempobject = {Name : temp[0] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
		}
		else{
			foodItems[item] = foodItems[item].replace(" " , "");
			var tempobject = {Name : foodItems[item] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}

function numberParse(foodItems,numbersList){
	var foodItemsObject = [];
	for  (var item in foodItems){
		console.log(foodItems[item]);
		if(foodItems[item] != "" || "/n"){
			foodItems[item] = foodItems[item].replace(" " , "");
			var tempobject = {Name : foodItems[item] , HealthRate : numbersList[item]}
			console.log(tempobject);
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}



function parseEmailForFoodItems(body){
	var foodItems = [];
	var foodItemsObject = [];
	var numbersList = body.match(/[0-9]/g);
	
	// if(body.indexOf("\n") == (body.length - 1)  ){
	// 	body = body.slice(0,-1); 
	// }
	// while(body.indexOf("\n") != (body.length - 1)  ){
	// 	console.log("PROBLEM");
	// 	body = body.slice(0,-1); 
	// }
	while(body[body.length -1 ] == "\n"){
		console.log("PROBLEM");
		body = body.slice(0,-1); 
	}

	if(body.indexOf("\n") != -1){
		console.log("contains an enter");
		foodItems = body.split("\n");
		console.log(foodItems);
		return noNumberParse(foodItems);
	}

	else if(body.indexOf(",") != -1){
		console.log("contains a coma");
		console.log(body);
		foodItems = body.split(",");
		console.log(foodItems);
		return noNumberParse(foodItems);
	}
	else if (numbersList != null){
		console.log("contains a number");
		flag = false;
		foodItems = body.split(/[0-9]/);
		return numberParse(foodItems,numbersList);

	}
	else{
		var foodItemsObject = [];
		console.log("doesnt contain anything");
		var tempobject = {Name : body}
		foodItemsObject.push(tempobject);
		return foodItemsObject;
	}
}

exports.getEmail = function(req, res){
	console.log(req.body.plain);
	var senderEmail  = req.body.headers.From.split(">")[0].split("<")[1];
	var email = {
		From : senderEmail,
		Subject : req.body.headers.Subject,
		Body : req.body.plain,
		FoodItems : parseEmailForFoodItems(req.body.plain),
		Date: new Date(),
	}
	// User.findOne({email : senderEmail}, function(err, user){
	// 	if(global.users[user.googleID]){
	// 		global.users[user.googleID].emit('email' , email); 
	// 	}
	// });

	User.findAndStoreEmail(senderEmail, email ,function(email1){
		User.findOne({email : senderEmail}, function(err, user){
			if(global.users[user.googleID]){
				global.users[user.googleID].emit('email' , email1); 
				res.send(200);
			}
		});
		
	});

}


exports.getFake = function(req, res){
	var senderEmail = req.user.emails[0].value;
	var email = req.body;

	// console.log(global.users[global.id]);
	// console.log(global.users[global.id])
	User.findOne({email : senderEmail}, function(err, user){
		// console.log(user);
		// global.users[user.id].emit('email' , email); 
	});
	// if(global.email == )
	// global.users[global.id].emit('email' , email); 
	// global.io.sockets.emit('email', email);
	// global.io.of(global.id).emit('email' , email);

	User.findAndStoreEmail(senderEmail, email ,function(err, email){
		console.log(email);
		res.send(email);
		res.writeHead(200, {'content-type': 'text/plain'})
    	res.end('Message Received. Thanks!\r\n')
	})


}


