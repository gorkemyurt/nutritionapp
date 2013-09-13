var mongoose = require('mongoose')
    ,Schema = mongoose.Schema


var userSchema = new Schema({
	googleID : String,
	accessToken : String,
	email : String,
	openId: Number,
	phoneNumber: String,
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});

userSchema.statics = {

	findOrCreate : function ( query , profile , cb) {
		var that = this;
		console.log(profile.id);
		this.find({googleID : profile.id})
			.exec(function (err, user){
				if(user.length != 0){
					return user;
				}
				else{
					var newUser = new that({
						googleID : profile.id,
						accessToken : profile.accessToken,
						email : profile._raw.email
					});
					newUser.save(function (err) {
						if(err)console.log(err);
						console.log("user sucessfully created");
					})
				
				}
			})
	}

}

mongoose.model('User', userSchema);