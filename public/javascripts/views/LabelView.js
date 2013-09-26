define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
], function ($, _, Backbone, Marionette) {
	'use strict';

	var LabelView = Backbone.Marionette.ItemView.extend({
		

        template: "#labelTemplate"

    });
    return LabelView;
	
});

