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

        sendFakeEmail: function(e){
          var HealthRating = $(e.currentTarget).parent().find(".current").text();
          // var emailObject =  parseEmailForFoodItems($("#fake-email").val());
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
          
          var myEmail = new Email({
              Subject : {Name : $("#fake-email-input-area").val(), HealthRate : NumberRating},
              Date : new Date(),
              FoodItems: []
          });
          $("#fake-email").val("");
          $("#fake-email-input-area").val("");
          console.log("Fake email");
          console.log(myEmail);


          var that = this;
          myEmail.save(null,{
            success:function(model){
              console.log("Saved Successfully");
              that.collection.add(model)
            }
          });
      }

    });

    return FormView;
	
});

