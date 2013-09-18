define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function ($, _, Backbone, Marionette) {
	'use strict';

	var EmailView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			_.bindAll(this);
    		this.model.on('change', this.render);
		},

        template: '#EmailView'

    });
    return EmailView;
	
});

