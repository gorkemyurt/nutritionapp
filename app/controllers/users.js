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


exports.getEmail = function(req, res){
	console.log(req.body.headers);
	console.log(req.body.headers.From)
	var senderEmail  = req.body.headers.From.split(">")[0].split("<")[1];


	User.findAndStoreEmail(senderEmail, req.user.profile, email ,function(){
		res.send(200);
	});
	// User.find({email : senderEmail },function(err,user){
	// 	if(err)console.log(err);
	// 	console.log(user);
	// 	res.writeHead(200, {'content-type': 'text/plain'})
	// 	res.end('Message Received. Thanks!\r\n')
	// })

}

exports.getFake = function(req, res){
	var senderEmail = "yurtseven.gorkem@gmail.com";
	var email = {
		From : senderEmail,
		Subject : "Lunch",
		Body : "I had chipotle today for lunch",
		Date: new Date(),
	}

	User.findAndStoreEmail(senderEmail, req.user.profile, email ,function(){
		res.send(200);
	})


}


