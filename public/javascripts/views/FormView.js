define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
  'parseEmail',
  'Email'

  ], function ($, _, Backbone, Marionette, parseEmail, Email) {
	'use strict';

    var FormView = Backbone.Marionette.ItemView.extend({

        template : '#formView',
        events:{
          'click .sendEmail' : 'sendFakeEmail'
        },


        sendFakeEmail: function(){
          var emailObject =  parseEmailForFoodItems($("#fake-email").val());
          var myEmail = new Email({
              Subject : "Not Specified",
              Date : new Date(),
              FoodItems: emailObject
          });
          // console.log(this.collection.models);
          this.collection.add(myEmail);
          // console.log(this.collection.models);
          // myEmail.save();

        }

    });

    return FormView;
	
});

