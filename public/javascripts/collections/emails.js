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
	   		var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
	   		var that = this;          
	   		this.fetch().complete(function(){
		   		_.each(that.models, function(item){
	                item.set("Date", months[new Date(item.get("Date")).getMonth()] + " " + new Date(item.get("Date")).getUTCDate());
	                item.set("Name", "Scandal");
          		});
	   		});

	   	}
	
	});

	return Emails;
});