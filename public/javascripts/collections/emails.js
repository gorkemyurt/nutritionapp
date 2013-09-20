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
	   		var userid = $('#userid').text();
			console.log(userid);
		    // var socket = io.connect('http://staginggorkemnutrition.herokuapp.com/108979240932274925946');
		    // var socket = io.connect('http://staginggorkemnutrition.herokuapp.com');
		    var socket = io.connect('http://localhost:3000');

	         socket.of(userid + "").on('email', function (data) {
	         	console.log("HEY HEY")
	         	var newEmail = new emailModel(data);
	         	that.add(newEmail);
	        });
	   	}
	
	});

	return Emails;
});