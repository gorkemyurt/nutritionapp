define([
	'zepto',
	'underscore',
	'backbone',
	'Email',
	'marionette',
	'socketio'
], function ($, _, Backbone, emailModel, Marionette, io) {
	'use strict';

	var Emails = Backbone.Collection.extend({

		url : '/emails',
	    model : emailModel,

	   	initialize : function() {
	   		var that = this;
		    var socket = io.connect();

			socket.on('email', function (data) {
				console.log("aHEY aHEY")
				console.log(data);
				var newEmail = new emailModel(data);
				that.add(newEmail);
			});

	   	}
	
	});

	return Emails;
});