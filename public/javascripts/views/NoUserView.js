define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function ($, _, Backbone, Marionette) {
	'use strict';


	var NoUserView = Backbone.Marionette.ItemView.extend({

	  template : "#noUsersView"

	});
    return NoUserView;
	
});

