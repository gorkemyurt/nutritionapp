var mongoose = require('mongoose')
  , Email = mongoose.model('Email')
  , User = mongoose.model('User')


exports.home = function(req,res){
	res.render('index')
}
exports.updateEmail = function(req, res){
  var update = req.body;
  var id = req.url.split("/")[2];
  Email.find({_id: id} , function(err, email){
      email = new Email(update);
      email.save()
  });
  User.findOne({googleID : req.user.id}, function(err, user){
      user.SentEmails.id(id).remove();
      user.SentEmails.push(new Email(update));
      user.save(function(err){
        res.end("200");
      });    
  });


}

exports.deleteEmail = function(req, res){
	var id = req.url.split("/")[2];
  	Email.find({_id: id}).remove();
  	console.log(req.user.id);
  	User.findOne({googleID : req.user.id}, function(err, user){
  		console.log(user.SentEmails);
  		user.SentEmails.id(id).remove();
  		user.save(function(err){
  			res.end("200");
  		});
  		
  	});
}
