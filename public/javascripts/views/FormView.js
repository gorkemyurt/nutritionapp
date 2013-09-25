define([
	'underscore',
	'backbone',
	'marionette',
  'parseEmail',
  'Email'

  ], function (_, Backbone, Marionette, parseEmail, Email) {
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
          
          // console.log(this.collection.models);
          myEmail.save({}, {
            success : function(res, err){
              console.log(res);
              console.log(err);
            }
        });
          // this.collection.add(myEmail);

      }

    });

    return FormView;
	
});

