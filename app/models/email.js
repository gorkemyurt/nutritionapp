var mongoose = require('mongoose')
    ,Schema = mongoose.Schema



var emailSchema = new Schema({
	From : String,
	Subject : String,
	Body : String,
	Date: Date,
	// Owner : User
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});


mongoose.model('Email', emailSchema);