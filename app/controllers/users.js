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

// function parseEmailForFoodItems(body){


// }


exports.getEmail = function(req, res){
	console.log(req.body.plain);
	var senderEmail  = req.body.headers.From.split(">")[0].split("<")[1];
	var email = {
		From : senderEmail,
		Subject : req.body.headers.Subject,
		Body : req.body.plain,
		Date: new Date(),
	}

	User.findAndStoreEmail(senderEmail, email ,function(){
		res.send(200);
	});


}



exports.getFake = function(req, res){
	var senderEmail = "yurtseven.gorkem@gmail.com";
	var email = {
		From : senderEmail,
		Subject : "ambulance",
		Body : "they are always very very laud",
		Date: new Date(),
	}

	User.findAndStoreEmail(senderEmail, email ,function(){
		res.writeHead(200, {'content-type': 'text/plain'})
    	res.end('Message Received. Thanks!\r\n')
	})


}


