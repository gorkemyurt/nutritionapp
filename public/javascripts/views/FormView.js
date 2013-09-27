define([
  'zepto',
	'underscore',
	'backbone',
	'marionette',
  'parseEmail',
  'Email',
  'text!templates/formTemplate.html'

  ], function ($,_, Backbone, Marionette, parseEmail, Email, formTemplate) {
	'use strict';

    var FormView = Backbone.Marionette.ItemView.extend({

        template : _.template(formTemplate),
        events:{
          'click .sendEmail' : 'sendFakeEmail'
        },

        sendFakeEmail: function(){
          var emailObject =  parseEmailForFoodItems($("#fake-email").val());
          var myEmail = new Email({
              Subject : $("#fake-email-input-area").val(),
              Date : new Date(),
              FoodItems: emailObject
          });
          $("#fake-email").val("");
          $("#fake-email-input-area").val("");

          var that = this;
          this.model.save(myEmail , {
            success: function (model, response){
              that.collection.add(response);
              console.log(response);
            }
          });

      }

    });

    return FormView;
	
});

