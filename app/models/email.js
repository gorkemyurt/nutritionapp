var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
   , FoodItemSchema = require('../models/fooditem.js')
   // , UserSchema = require('../models/user.js').schema
   // , User = require('../models/user.js').model

var emailSchema = new Schema({
	From : String,
	Subject : FoodItemSchema,
	Body : String,
	Date: Date,
	FoodItems : [FoodItemSchema],
	Type : Number
	// Owner : { type : Schema.Types.ObjectId , ref: "User" }
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});

module.exports = {
	model: mongoose.model('Email', emailSchema),
	schema : emailSchema 
}
// mongoose.model('Email', emailSchema);