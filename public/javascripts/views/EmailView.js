define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/emailTemplate.html',
	'text!templates/mealDetailTemplate.html'
], function ($,_, Backbone, Marionette, emailTemplate, mealDeatailTemplate) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
	    events: function(){
	    	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	    	var events_hash = {
    			// insert all the events that go here regardless of mobile or not
  			};
			if (isMobile) {
			    _.extend(events_hash, {"tap .delete-fooditem": "deleteFoodItem"});
			    _.extend(events_hash, {"tap .add-details": "editModel"});
			    _.extend(events_hash, {"tap .delete-link": "deleteModel"});
			    _.extend(events_hash, {"tap .submit-new-meal-input": "addToModel"});
			    _.extend(events_hash, {"tap .plus-link": "addForm"});

			} else {
			    _.extend(events_hash, {"click .delete-fooditem" : "deleteFoodItem"});
			    _.extend(events_hash, {"click .add-details" : "editModel"});
			    _.extend(events_hash, {"click .delete-link" : "deleteModel"});
			    _.extend(events_hash, {"click .submit-new-meal-input" : "addToModel"});
			    _.extend(events_hash, {"click .plus-link" : "addForm"});
			    _.extend(events_hash, {"click .meal-name" : "editName"});
			    _.extend(events_hash, {"keyup .edit-title" : "submitEditName"});



			}
			return events_hash;
	    },

		template: _.template(emailTemplate),

		initialize : function(){
			console.log("email")
			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);

		},

		submitEditName : function(e){
			if ( e.keyCode === 13 ) { // 13 is enter key
				console.log("enter pressed");
			}
		},

		editName : function(e){
			var target = $(e.currentTarget).children(".edit-title-container");
			var currentTargetText = $(e.currentTarget).text();
			console.log(currentTargetText);
			if( target.css('display') == 'none') {
				$(e.currentTarget).children((".edit-title-container")).show();
				$(e.currentTarget).children(".edit-title-container").find(".edit-title").val(currentTargetText);
			}
		},

		sendFakeEmail : function(e){
	        $.ajax({
	          type: "POST",
	          url: '/incomingFake',
	          data: {data : $("#fake-email").val()}
	        });
		},

		editModel : function(e){
			if($(e.currentTarget).attr("id") == 'up-arrow'){
				$(e.currentTarget).parent().html('<img id="down-arrow" class="carrot-arrow add-details" src="/images/carrot-arrow-down.png">')
			}
			else{
				$(e.currentTarget).parent().html('<img id="up-arrow" class="carrot-arrow add-details" src="/images/carrot-arrow-up.png">')
			}
			// $(e.currentTarget).parent().html("<i class='foundicon-up-arrow add-details'></i>")
			$(e.currentTarget).toggle();

			// if($(e.currentTarget).text() == "Detailed View"){
			// 	$(e.currentTarget).text("Close")
			// }
			// else{
			// 	$(e.currentTarget).text("Detailed View")
			// }
			$("#" + this.model.id).slideToggle();
		},

		deleteFoodItem : function(e){

			var deletedItem = $(e.currentTarget).parent().text().split("X")[0];
			deletedItem =  deletedItem.replace(" ","");

			$(e.currentTarget).parent().slideUp(2000);

			var curitems = _.pluck(this.model.get("FoodItems"), "Name");
			var index = curitems.indexOf(deletedItem);
			var currentModel = this.model.get("FoodItems");

			currentModel.splice(index,1);
			
			this.model.set("FoodItems", currentModel);
			// this.model.trigger('change');
			this.SpecialRender($(e.currentTarget).parent().parent());
			this.model.save();
		},
 

		SpecialRender: function(e){
			    this.isClosed = false;

			    this.triggerMethod("before:render", this);
			    this.triggerMethod("item:before:render", this);

			    var data = this.serializeData();
			    data = this.mixinTemplateHelpers(data);

			    var template = this.getTemplate();
			    var html = Marionette.Renderer.render(template, data);

			    this.$el.html(html);
			    this.bindUIElements();

			    this.triggerMethod("render", this);
			    this.triggerMethod("item:rendered", this);

			    $("#" + this.model.id).toggle();
			    $("." + this.model.id).text("Close");
	
			    return this;
  		},



		deleteModel : function(e){
			console.log(this.model);
			this.model.destroy({success: function(model, response){
				console.log(response);
			}});
		},

		addToModel : function(e){

			var Name = $(e.currentTarget).parent().find(".new-meal-input").val();
			var HealthRating = $(e.currentTarget).parent().find(".current").text();
			var NumberRating = 0;
			if(HealthRating == "Healthy"){
				NumberRating = 1;
			}
			else if(HealthRating == "Medium"){
				NumberRating = 2;

			}
			else if(HealthRating == "Unhealthy"){
				NumberRating = 3;
			}

			var newFoodItem = {Name: Name, HealthRate: NumberRating.toString()} 
			var currentArray = this.model.get("FoodItems");
			currentArray.push(newFoodItem);
			this.model.set("FoodItems", currentArray);
			this.SpecialRender($(e.currentTarget).parent().parent());
			this.model.save();

		},

		onRender: function(){

		}

		// addForm : function(e){
		// 	$(".edit-panel").attr("style","overflow:visible");
		// 	$(e.currentTarget).parent().parent().parent().parent().find(".new-meal-container").append(mealDeatailTemplate);

		// 	// $(".additional-console").height($(".additional-console").height() + 50);
		// }

    });
    return EmailView;
	
});

