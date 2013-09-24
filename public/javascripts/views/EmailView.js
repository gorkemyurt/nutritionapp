define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/emailTemplate.html'
], function ($, _, Backbone, Marionette, emailTemplate) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
		events:{
    		"click button" : " sendFakeEmail",
    		"mouseenter .panel" : "handleMouseEnter",
    		"mouseleave .panel" : "handleMouseLeave",
    		"click .meal-info" : "editModel",
    		"click .delete-link" : "deleteModel",
    		"click .delete-fooditem" : "deleteFoodItem"
		},

		template: _.template(emailTemplate),

		initialize : function(){
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
			if($(".edit-panel").is(':visible')){
				$(".edit-panel").slideUp();
			}
			else{
				$(".edit-panel").slideDown();
			}
		},

		deleteFoodItem : function(e){
			var deletedItem = $(e.currentTarget).parent().text().split("X")[0];
			deletedItem =  deletedItem.replace(" ","");
			$(e.currentTarget).parent().slideUp();
			var curitems = _.pluck(this.model.get("FoodItems"), "Name");
			var index = curitems.indexOf(deletedItem);
			var currentModel = this.model.get("FoodItems");
			currentModel.splice(index,1);
			this.model.set("FoodItems", currentModel);
			this.model.trigger('change');
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

		// onBeforeRender: function(){
		// 	console.log("this was called");
		// 	$(".edit-panel").css("display" , "block");

  // 		},

		handleMouseEnter : function(e){
			$(e.currentTarget).find(".edit-icons").toggle();
		},

		handleMouseLeave : function(e){
			$(e.currentTarget).find(".edit-icons").toggle();
		}


    });
    return EmailView;
	
});

