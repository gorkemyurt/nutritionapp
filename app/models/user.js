var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    , Email = mongoose.model('Email')
   , EmailSchema = require('../models/email.js');

var userSchema = new Schema({
	googleID : String,
	accessToken : String,
	email : String,
	openId: Number,
	phoneNumber: String,
	SentEmails : [EmailSchema]
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});

userSchema.statics = {

	findOrCreate : function ( query , profile , cb) {
		var that = this;
		// console.log(profile._raw);
		// console.log(profile.emails[0].value);
		this.find({googleID : profile.id})
			.exec(function (err, user){
				if(user.length != 0){
					console.log(user);
					return user;
				}
				else{
					var newUser = new that({
						googleID : profile.id,
						accessToken : profile.accessToken,
						email : profile.emails[0].value
					});
					newUser.save(function (err) {
						if(err)console.log(err);
						console.log("user sucessfully created");
					})
				
				}
			})
	},

	findAndStoreEmail : function (senderEmail , profile , incomingEmail, cb){
		this.find({email : senderEmail})
			.exec(function (err, user){
				if(user.length != 0){
					var newEmail = new Email(incomingEmail);
					newEmail.save(function (err){
						user[0].SentEmails.push(newEmail);
						user[0].save();
					})
				}
				else{
					return "user doesnt exist!"
				
				}
			})
	

	}



}

mongoose.model('User', userSchema);