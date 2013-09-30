define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'text!templates/loadingTemplate.html'

], function ($, _, Backbone, Marionette, loadingTemplate) {
	'use strict';

	var LoadingView = Backbone.Marionette.ItemView.extend({
		
        template: _.template(loadingTemplate)
    });
    return LoadingView;
	
});
