define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'EmailsView',
	'text!templates/listViewTemplate.html',

], function ($,_, Backbone, Marionette,EmailsView, ListViewTemplate) {
	'use strict';

    var ListView = Backbone.Marionette.Layout.extend({
    	template : _.template(ListViewTemplate),
    	regions :{
	    	breakfast : "#breakfast",
	        lunch : "#lunch",
	        dinner : "#dinner"
    	}

    	// initialize: function(){
		   //    this.breakfast.show(new EmailsView({collection: new this.collection(this.collection.where({Type : 1}))}));
	    //       this.lunch.show(new EmailsView({collection: new this.collection(MyApp.emails.where({Type : 2}))}));
	    //       this.dinner.show(new EmailsView({collection: new this.collection(MyApp.emails.where({Type : 3}))}));

    	// }
    });
    return ListView;
	
});

