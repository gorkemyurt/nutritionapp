var mongoose = require('mongoose')
    ,Schema = mongoose.Schema



var FoodItemSchema = new Schema({
	Name: String,
	Restaurant: String,
	HealthRate: Number
});


mongoose.model('FoodItem', FoodItemSchema);