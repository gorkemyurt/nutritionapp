define([
	'jquery',
	'underscore',
	'backbone',
	'User',
	'marionette',
	'localStorage'
], function ($, _, Backbone, userModel, Marionette) {
	'use strict';

	var Users = Backbone.Collection.extend({

	    model : userModel,
	  
	   	localStorage: new Backbone.LocalStorage('marionette-app'),

	   	initialize : function() {
	   		this.fetch();
	   	}
	
	});

	return Users;
});