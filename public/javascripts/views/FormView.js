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
          var HealthRating = $(e.currentTarget).parent().find(".healthrate").text();
          var MealType = $(e.currentTarget).parent().find(".typeselect").text();
          console.log(MealType);
          console.log(HealthRating);
          var NumberRating = 0;
          var TypeNumber = 0;
          if(MealType == "Breakfast"){
            TypeNumber = 1;
          }

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
              FoodItems: [],
              Type : 1
          });
          $("#fake-email").val("");
          $("#fake-email-input-area").val("");
          var that = this;
          console.log(that);
          myEmail.save(null,{
            success:function(model){
              console.log("Saved Successfully");
              that.collection.add(model);
            }
          });
      }

    });

    return FormView;
	
});

