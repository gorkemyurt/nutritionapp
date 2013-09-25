define([
	'underscore',
	'backbone',
	'marionette',
	'Email',
	'parseEmail',
	// 'text!templates/NoEmailTemplate.html',
	'Emails'

], function (_, Backbone, Marionette,Email,parseEmail , Emails ) {
	'use strict';


	var NoEmailView = Backbone.Marionette.ItemView.extend({

		// template: _.template(NoEmailTemplate),

		template: "#NoEmailTemplate",

		events:{
	          'click .sendEmail' : 'sendFakeEmail'
	    },
	    
	    sendFakeEmail: function(){
	          var emailObject =  parseEmailForFoodItems($("#fake-email").val());
	          var myEmail = new Email({
	              Subject : $(".input-meal-name").val(),
	              Date : new Date(),
	              FoodItems: emailObject
	          });
	          // var newEmailsCol = new Emails();
	          this.collection.add(myEmail);
	          var that = this;
	          myEmail.save().complete(function(){
	          	that.collection.trigger("refresh");
	          })

	    }


		});
	    return NoEmailView;
	
});

