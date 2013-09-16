define([
	'jquery',
	'underscore',
	'backbone',
	'Email',
	'marionette',
	'localStorage'
], function ($, _, Backbone, emailModel, Marionette) {
	'use strict';

	var Emails = Backbone.Collection.extend({

		url : '/emails',
	    model : emailModel,

	   	initialize : function() {
	   		this.fetch();
	   	}
	
	});

	return Emails;
});