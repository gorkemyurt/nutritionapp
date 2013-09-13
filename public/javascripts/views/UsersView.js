define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'UserView',
	'NoUserView'
], function ($, _, Backbone, Marionette, UserView, NoUserView) {
	'use strict';

    var UsersView = Backbone.Marionette.CollectionView.extend({
        
        itemView : UserView,
        emptyView : NoUserView
    });
    return UsersView;
	
});

