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
	res.writeHead(200, {'content-type': 'text/plain'})
	res.end('Message Received. Thanks!\r\n')

}