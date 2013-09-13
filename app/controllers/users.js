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
	parsedBody = JSON.parse(req.body)
	console.log(parsedBody.from)
	console.log(parsedBody.headers['Subject'])
	console.log(parsedBody.plain)
	console.log(parsedBody.html)
	res.send(200);
}