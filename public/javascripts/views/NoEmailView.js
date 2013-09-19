define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'Email',
	'parseEmail',
	'text!templates/NoEmailTemplate.html',
	'Emails'

], function ($, _, Backbone, Marionette,Email,parseEmail, NoEmailTemplate , Emails ) {
	'use strict';


	var NoEmailView = Backbone.Marionette.ItemView.extend({

		template: _.template(NoEmailTemplate),


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
	          var newEmailsCol = new Emails();
	          newEmailsCol.add(myEmail);
	          myEmail.save();
	          location.reload();

	    }


		});
	    return NoEmailView;
	
});

