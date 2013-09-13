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
	console.log(req.body.headers.from);
	// console.log("from   "  + req.body.headers.envelope.from);
	// console.log("plain  " + req.body.headers.plain);


	// var form = new formidable.IncomingForm()
 //  	form.parse(req, function(err, fields, files) {
	//     console.log(fields.to)
	//     console.log(fields.from)
	//     console.log(fields.subject)
	//     res.writeHead(200, {'content-type': 'text/plain'})
	//     res.end('Message Received. Thanks!\r\n')
 //  	})
}