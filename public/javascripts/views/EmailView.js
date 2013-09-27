define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/emailTemplate.html'
], function ($,_, Backbone, Marionette, emailTemplate) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
		events:{

				"tap .delete-fooditem" : "deleteFoodItemTouch",
				"tap .meal-info" : "editModelTouch",
				"click .delete-fooditem" : "deleteFoodItem",
				"click .meal-info" : "editModel",
	    		"click button" : " sendFakeEmail",
	    		// "mouseenter .panel" : "handleMouseEnter",
	    		// "mouseleave .panel" : "handleMouseLeave",
	    		"click .delete-link" : "deleteModel",
	    		"click .submit-new-meal-input" : "addToModel"
    	},

		template: _.template(emailTemplate),

		initialize : function(){
			console.log(window.mobilecheck);
			_.bindAll(this);
    		this.model.on('change', this.render);
    		this.model.on('change-item', this.renderChange);
			var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
			this.model.set("Date", months[new Date(this.model.get("Date")).getMonth()] + " " + new Date(this.model.get("Date")).getUTCDate() + " " + new Date(this.model.get("Date")).getHours() + ":" + new Date(this.model.get("Date")).getMinutes());

		},

		sendFakeEmail : function(e){
	        $.ajax({
	          type: "POST",
	          url: '/incomingFake',
	          data: {data : $("#fake-email").val()}
	        });
		},

		editModel : function(e){
			if(window.mobilecheck) return
			$("#" + this.model.id).slideToggle();
		},

		editModelTouch : function(e){
			$("#" + this.model.id).slideToggle();

		},

		deleteFoodItem : function(e){
			if(window.mobilecheck) return

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
 
		deleteFoodItemTouch : function(e){
			var deletedItem = $(e.currentTarget).parent().text().split("X")[0];
			deletedItem =  deletedItem.replace(" ","");

			$(e.currentTarget).parent().slideUp(2000);

			var curitems = _.pluck(this.model.get("FoodItems"), "Name");
			var index = curitems.indexOf(deletedItem);
			var currentModel = this.model.get("FoodItems");

			currentModel.splice(index,1);

			this.model.set("FoodItems", currentModel);
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
			if(HealthRating == "Healty"){
				NumberRating = 1;
			}
			else if(HealthRating == "Medium"){
				NumberRating = 2;
			}
			else if(HealthRating == "Unhealty"){
				NumberRating = 3;
			}
			var newFoodItem = {Name: Name, HealthRate: NumberRating.toString()} 
			var currentArray = this.model.get("FoodItems");
			currentArray.push(newFoodItem);
			this.model.set("FoodItems", currentArray);
			this.SpecialRender($(e.currentTarget).parent().parent());
			this.model.save();
			

		},


		handleMouseEnter : function(e){
			$(e.currentTarget).find(".edit-icons").toggle();
		},

		handleMouseLeave : function(e){
			$(e.currentTarget).find(".edit-icons").toggle();
		}


    });
    return EmailView;
	
});

