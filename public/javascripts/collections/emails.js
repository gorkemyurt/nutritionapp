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
	          var newEmail = new emailModel(data);
	          this.add(newEmail);
	          // socket.emit('my other event', { my: 'data' });
	        });
	   	}
	
	});

	return Emails;
});