var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
   , FoodItemSchema = require('../models/fooditem.js');




var emailSchema = new Schema({
	From : String,
	Subject : FoodItemSchema,
	Body : String,
	Date: Date,
	FoodItems : [FoodItemSchema]
	// Owner : User
	// Logs : [{type: Schema.ObjectId, ref: 'events'}]
});


mongoose.model('Email', emailSchema);