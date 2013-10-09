define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	"currentDate",
    "moment",
	'text!templates/datePickerTemplate.html'

], function ($, _, Backbone, Marionette, currentDate , moment, datePickerTemplate) {
	'use strict';

	var LabelView = Backbone.Marionette.ItemView.extend({
		model : currentDate,
		events : {
        	"click .nextDay" : "nextDay",
        	"click .previousDay" : "previousDay"
        },
		
        // template: function(){
        // 	return _.template(datePickerTemplate);
        // },

        template : _.template(datePickerTemplate),
        
        initialize: function() {
        	// console.log(this.model);
        },

        nextDay : function(){

        	var tempDate = this.model.get("displayDate");
        	var newDate = moment(tempDate, 'dddd, MMMM DD YYYY').add('days' ,1 )
    		//triggers a refresh which is going to fetch the new date's meals from the database
            this.trigger("refresh", newDate._d);
            this.model.set("displayDate" , moment(new Date(newDate)).format('dddd, MMMM DD YYYY'));
            this.model.set("timeFromNow", moment(new Date(newDate)).from([moment().year(), moment().month() ,moment().date()]));
        },

        previousDay: function(){
        	var tempDate = this.model.get("displayDate");
            console.log(moment(tempDate,  'dddd, MMMM DD YYYY'));
        	var newDate = moment(tempDate , 'dddd, MMMM DD YYYY').subtract('days' , 1);
			//triggers a refresh which is going to fetch the new date's meals from the database
			this.trigger("refresh", newDate._d);
			this.model.set("displayDate" , moment(new Date(newDate)).format('dddd, MMMM DD YYYY'));
            this.model.set("timeFromNow", moment(new Date(newDate)).from([moment().year(), moment().month(),moment().date()]));


        }



    });
    return LabelView;
	
});

