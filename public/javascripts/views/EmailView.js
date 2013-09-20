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
    		"click button" : " sendFakeEmail"
		},

		sendFakeEmail : function(e){
	        $.ajax({
	          type: "POST",
	          url: '/incomingFake',
	          data: {data : $("#fake-email").val()}
	        });
		},

		initialize : function(){
			// _.bindAll(this);
   //  		this.model.on('change', this.render);
		},

        template: _.template(emailTemplate)

    });
    return EmailView;
	
});

