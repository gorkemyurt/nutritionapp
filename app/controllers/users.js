var mongoose = require('mongoose')
  , User = mongoose.model('User')
 , http = require('https')
 ,querystring = require('querystring')
 ,formidable = require('formidable')

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
	User.find({email : senderEmail },function(err,user){
		if(err)console.log(err);
		console.log(user);
		res.writeHead(200, {'content-type': 'text/plain'})
		res.end('Message Received. Thanks!\r\n')
	})

}