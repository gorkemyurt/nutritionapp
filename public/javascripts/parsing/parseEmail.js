function noNumberParse(foodItems) {
	var foodItemsObject = [];
	for  (var item in foodItems){
		console.log(foodItems[item]);
		var tempnumber = foodItems[item].match(/[0-9]/g);
		if(tempnumber){
			var temp = foodItems[item].split(/[0-9]/)
			var tempobject = {Name : temp[0] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
		}
		else{
			var tempobject = {Name : foodItems[item] , HealthRate : parseInt(tempnumber)}
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}

function numberParse(foodItems,numbersList){
	var foodItemsObject = [];
	for  (var item in foodItems){
		console.log(foodItems[item]);
		if(foodItems[item] != "" || "/n"){
			var tempobject = {Name : foodItems[item] , HealthRate : numbersList[item]}
			console.log(tempobject);
			foodItemsObject.push(tempobject);
		}
	}
	return foodItemsObject;
}



function parseEmailForFoodItems(body){
	var foodItems = [];
	var foodItemsObject = [];
	var numbersList = body.match(/[0-9]/g);
	
	if(body.indexOf("\n") == (body.length - 1)  ){
		body = body.slice(0,-1); 
	}
	if(body.indexOf("\n") != -1){
		console.log("contains an enter");
		foodItems = body.split("\n");
		return noNumberParse(foodItems);
	}

	else if(body.indexOf(",") != -1){
		console.log("contains a coma");
		console.log(body);
		foodItems = body.split(",");
		console.log(foodItems);
		return noNumberParse(foodItems);
	}
	else if (numbersList != null){
		console.log("contains a number");
		flag = false;
		foodItems = body.split(/[0-9]/);
		return numberParse(foodItems,numbersList);

	}
	else{
		var foodItemsObject = [];
		console.log("doesnt contain anything");
		var tempobject = {Name : body}
		foodItemsObject.push(tempobject);
		return foodItemsObject;
	}
}