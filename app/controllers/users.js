var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 ,querystring = require('querystring')

exports.login = function(req,res){
	if(req.user){
		res.send(req.profile);
		res.render('index');
	}
	else{
		res.render('login')
	}

}

exports.emails = function(req,res){
	// console.log(req.user);
	User.findOne({googleID : req.user.id},function(err, user){
		// console.log(user);
		// console.log(user.SentEmails);
		res.send(user.SentEmails);
	})
}

function parseEmailForFoodItems(body){
	var foodItems = [];
	var foodItemsObject = [];
	var numbersList = body.match(/[0-9]/g);
	var flag = true;
	if(body.indexOf("\n") != -1){
		foodItems = body.split("\n");
	}
	else if(body.indexOf(",") != -1){
		foodItems = body.split(",");
	}
	else {
		flag = false;
		foodItems = body.split(/[0-9]/);

	}
	console.log(foodItems)
	if(flag){
		for  (var item in foodItems){
			var tempnumber = foodItems[item].match(/[0-9]/g);
			if(tempnumber){
				var temp = foodItems[item].split(/[0-9]/)
				var tempobject = {Name : temp[0] , HealthRate : parseInt(tempnumber)}
				foodItemsObject.push(tempobject);
			}
			else{
				var tempobject = {Name : foodItems[item] , HealthRate : parseInt(tempnumber)}
				foodItemsObject.push(tempobject);
			}
		}
	}
	else{
		for  (var item in foodItems){
			if(foodItems[item] != ""){
				var tempobject = {Name : foodItems[item] , HealthRate : numbersList[item]}
				console.log(tempobject);
				foodItemsObject.push(tempobject);
			}
		}
	}
	return foodItemsObject;

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
	console.log(email);
	User.findAndStoreEmail(senderEmail, email ,function(){
		res.send(200);
	});


}



exports.getFake = function(req, res){
	var senderEmail = "yurtseven.gorkem@gmail.com";
	var email = {
		From : senderEmail,
		Subject : "ambulance",
		Body : "chipotle 2 apple salad 1",
		FoodItems : parseEmailForFoodItems("chipotle 2 apple salad 1"),
		Date: new Date(),
	}

	User.findAndStoreEmail(senderEmail, email ,function(){
		res.writeHead(200, {'content-type': 'text/plain'})
    	res.end('Message Received. Thanks!\r\n')
	})


}


