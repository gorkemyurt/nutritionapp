define([
	'jquery',
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
		    var socket = io.connect('http://staginggorkemnutrition.herokuapp.com');
	         socket.on('email', function (data) {
	          	console.log("i got the socket connection");
	          	console.log(data);
	        });
	   	}
	
	});

	return Emails;
});