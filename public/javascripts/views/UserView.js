define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function ($, _, Backbone, Marionette) {
	'use strict';

	var UserView = Backbone.Marionette.ItemView.extend({
            
        template: '#userView'

    });
    return UserView;
	
});

