define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	"currentDate",
	'text!templates/datePickerTemplate.html'

], function ($, _, Backbone, Marionette, currentDate , datePickerTemplate) {
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
        	var newDate = tempDate.getTime() + 86400000 ;
        	if( newDate > new Date().getTime()){
        		alert("this is a time machine that only allows time travel to the past");
        		//it means user wants to know about future, display warning 
        	}
        	else{
        		//triggers a refresh which is going to fetch the new date's meals from the database
        		this.trigger("refresh", new Date (newDate ) );
        		this.model.set("displayDate" , new Date(newDate));
        	}

        },

        previousDay: function(){
        	var tempDate = this.model.get("displayDate");
        	console.log(tempDate);
        	var newDate = tempDate.getTime() - 86400000 ;
        	console.log(new Date(newDate));
			//triggers a refresh which is going to fetch the new date's meals from the database
			this.trigger("refresh", new Date (newDate ) );
			this.model.set("displayDate" , new Date(newDate));

        }



    });
    return LabelView;
	
});

