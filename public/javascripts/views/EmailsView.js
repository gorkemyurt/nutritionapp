define([
	'zepto',
	'underscore',
	'backbone',
	'marionette',
	'EmailView',
	'EmptyMealView'
], function ($,_, Backbone, Marionette, EmailView, EmptyMealView) {
	'use strict';

    var EmailsView = Backbone.Marionette.CollectionView.extend({
    	emptyView: EmptyMealView,
        itemView : EmailView,
        itemViewOptions : function(){
        	return {collection : this.collection , type : this.options.type}
        },
		appendHtml: function(collectionView, itemView){
			console.log(this.options.type);
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return EmailsView;
	
});

