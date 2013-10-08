var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 , url = require('url')
 ,querystring = require('querystring')
 , global = require('../../global.js')
 , _ = require('underscore')

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
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var date = new Date(query.Date);
	date.setHours(12);
	date.setMinutes(0);
	date.setSeconds(0);
	// date.setMilliseconds(0);
	console.log(date);
	User.findOne({googleID : req.user.id},function(err, user){
		if(date){
			var filteredEmail = _.filter(user.SentEmails, function(mail){
				return mail.Date.getTime() == date.getTime();
			});
			res.send({data: filteredEmail, render : true});
		}
		else{
			if(user.SentEmails == []){
				res.send({data : user.SentEmails, render : false});
			}
			else{
				res.send({data : user.SentEmails, render : true});
			}
		}
		
	})
}

function noNumberParse(foodItems) {
	var foodItemsObject = [];
	for  (var item in foodItems){
		var tempnumber = foodItems[item].match(/[0-9]/g);
		if(tempnumber){
			var temp = foodItems[item].split(/[0-9]/)

			if(temp[0][0] == " "){
				temp[0] = temp[0].substring(1)
			}

			if(temp[0][temp[0].length] == " "){
				temp[0] = temp[0].substring(temp[0].length - 1)
			}

			var tempobject = {Name : temp[0] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
			
		}
		else{
			if(foodItems[item][0] == " "){
				foodItems[item] = foodItems[item].substring(1)
			}

			if(foodItems[item][foodItems[item].length] == " "){
				foodItems[item] = foodItems[item].substring(foodItems[item].length - 1)
			}
			var tempobject = {Name : foodItems[item] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}

function numberParse(foodItems,numbersList){
	var foodItemsObject = [];
	for  (var item in foodItems){
		if(foodItems[item] != "" || "/n"){

			if(foodItems[item][0] == " "){
				foodItems[item] = foodItems[item].substring(1)
			}

			if(foodItems[item][foodItems[item].length] == " "){
				foodItems[item] = foodItems[item].substring(foodItems[item].length - 1)
			}

			var tempobject = {Name : foodItems[item] , HealthRate : numbersList[item]}
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}

function parseSubjectForFoodItems(body){
	//handle if the user has no space
	var foodItems = [];
	var foodItemsObject = [];
	var numbersList = body.match(/[0-9]/g);
	var	mealNameArray = body.split(" ");
	var mealName = mealNameArray[0];

	if(mealName[0] == " "){
		mealName = mealName.substring(1)
	}

	if(mealName[mealName.length] == " "){
		mealName = fmealName.substring(mealName.length - 1)
	}

	
	return {Name : mealName, HealthRate : mealNameArray[mealNameArray.length -1 ]}

}

function parseEmailForFoodItems(body){
	var foodItems = [];
	var foodItemsObject = [];
	var numbersList = body.match(/[0-9]/g);

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
		Subject : parseSubjectForFoodItems(req.body.headers.Subject),
		Body : req.body.plain,
		FoodItems : parseEmailForFoodItems(req.body.plain),
		Date: new Date(),
	}

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
	User.findAndStoreEmail(senderEmail, email ,function(email){
		// res.send(email);
		// res.writeHead(200, {'content-type': 'text/plain'})
    	res.send(email)
	})


}


