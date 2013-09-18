define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/emailTemplate.html'
], function ($, _, Backbone, Marionette, emailTemplate) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			_.bindAll(this);
    		this.model.on('change', this.render);
		},

        template: _.template(emailTemplate)

    });
    return EmailView;
	
});

