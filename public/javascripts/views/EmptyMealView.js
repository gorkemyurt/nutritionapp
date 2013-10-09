define([
  'zepto',
	'underscore',
	'backbone',
	'marionette',
  'parseEmail',
  'Email',
  'moment',
  'text!templates/emptyMealTemplate.html'

  ], function ($,_, Backbone, Marionette, parseEmail, Email, moment, emptyMealTemplate) {
	'use strict';

    var EmptyMealView = Backbone.Marionette.ItemView.extend({

        template : _.template(emptyMealTemplate),
        events:{
          'click .send-email' : 'sendFakeEmail',
          'click .show-form' : 'showForm',
          'click .back-to-form' : 'backToForm'
        },
        showForm : function(e){
          $(e.currentTarget).parent().find(".empty-meal-form").toggle();
          $(e.currentTarget).toggle();
        },
        backToForm : function(e){
          $(e.currentTarget).parent().parent().parent().parent().find(".empty-meal-form").toggle();
          $(e.currentTarget).parent().parent().parent().parent().parent().find(".show-form").toggle();

        },


        sendFakeEmail: function(e){
          var HealthRating = $(e.currentTarget).parent().parent().parent().find(".healthrate").text();
          var NumberRating = 0;
          console.log(HealthRating);
          if(HealthRating == "Healthy"){
            NumberRating = 1;
          }

          else if(HealthRating == "Medium"){
            NumberRating = 2;
          }

          else if(HealthRating == "Unhealthy"){
            NumberRating = 3;
          }
          console.log(this.options.type);

          console.log($(e.currentTarget).parent().parent().parent().parent().find(".form-input-area").val())
          var myEmail = new Email({
              Subject : {Name : $(e.currentTarget).parent().parent().parent().parent().find(".form-input-area").val(), HealthRate : NumberRating},
              Date : moment($(".currentDate").text(),'dddd, MMMM DD YYYY' )._d,
              FoodItems: [],
              Type : this.options.type
          });
          $("#fake-email").val("");
          $("#fake-email-input-area").val("");

          var that = this;
          myEmail.save(null,{
            success:function(model){
              that.collection.add(model);
              console.log("Saved Successfully");
            }
          });

    }
    });

    return EmptyMealView;
	
});