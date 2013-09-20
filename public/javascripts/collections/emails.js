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
	   		var that = this;
		    var socket = io.connect('http://staginggorkemnutrition.herokuapp.com/108979240932274925946');
	         socket.on('email', function (data) {
	         	var newEmail = new emailModel(data);
	         	that.add(newEmail);
	        });
	   	}
	
	});

	return Emails;
});