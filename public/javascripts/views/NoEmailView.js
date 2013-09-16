define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function ($, _, Backbone, Marionette) {
	'use strict';


	var NoEmailView = Backbone.Marionette.ItemView.extend({

	  template : "#noUsersView"

	});
    return NoEmailView;
	
});

