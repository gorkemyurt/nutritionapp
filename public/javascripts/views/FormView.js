define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
  'User'
], function ($, _, Backbone, Marionette, User) {
	'use strict';

    var FormView = Backbone.Marionette.ItemView.extend({

        template : '#formView',
        events:{
          'click button' : 'createNewUser'
        },
        ui : {
            name: "#name",
            age: "#age"
        },

        createNewUser: function(){
          var myUser = new User({
            name : this.ui.name.val(),
            age : this.ui.age.val()
          })
          this.collection.add(myUser);
          myUser.save();
          this.ui.age.val("");
          this.ui.name.val("");
        }

    });

    return FormView;
	
});

