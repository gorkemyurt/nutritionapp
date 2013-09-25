define([
	'underscore',
	'backbone',
	'marionette',
	'EmailView',
	'NoEmailView'
], function (_, Backbone, Marionette, EmailView, NoEmailView) {
	'use strict';

    var EmailsView = Backbone.Marionette.CollectionView.extend({

        itemView : EmailView,
		appendHtml: function(collectionView, itemView){
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return EmailsView;
	
});

