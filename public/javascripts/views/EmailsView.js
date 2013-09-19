define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'EmailView',
	'NoEmailView'
], function ($, _, Backbone, Marionette, EmailView, NoEmailView) {
	'use strict';

    var EmailsView = Backbone.Marionette.CollectionView.extend({

        itemView : EmailView,
        emptyView : NoEmailView,
		appendHtml: function(collectionView, itemView){
		    collectionView.$el.prepend(itemView.el);
		}
    });
    return EmailsView;
	
});

