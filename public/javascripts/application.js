
require.config({
  paths: {
    'jquery': 'lib/jquery',
    'backbone': 'lib/backbone',
    'text': 'lib/text',
    'underscore': 'lib/underscore',
    'bootstrap' : 'lib/bootstrap',
    'marionette' : 'lib/backbone.marionette',
    'localStorage' : 'lib/backbone.localStorage',
    'less' : 'lib/less',
    'Email' : 'models/email',
    "Emails" : 'collections/emails',
    "FormView" : 'views/FormView',
    "EmailsView" : 'views/EmailsView',
    "EmailView" : 'views/EmailView',
    "NoEmailView" : 'views/NoEmailView',
    "FormView" : 'views/FormView',
    "MyApp" : 'app',
    "foundation": "foundation/foundation",
    "foundation.alerts": "foundation/foundation.alerts",
    "foundation.clearing": "foundation/foundation.clearing",
    "foundation.cookie": "foundation/foundation.cookie",
    "foundation.dropdown": "foundation/foundation.dropdown",
    "foundation.forms": "foundation/foundation.forms",
    "foundation.joyride": "foundation/foundation.joyride",
    "foundation.magellan": "foundation/foundation.magellan",
    "foundation.orbit": "foundation/foundation.orbit",
    "foundation.placeholder": "foundation/foundation.placeholder",
    "foundation.topbar": "foundation/foundation.topbar",
    "foundation.reveal": "foundation/foundation.reveal",
    "foundation.section": "foundation/foundation.section",
    "foundation.tooltips": "foundation/foundation.tooltips",
    "foundation.topbar": "foundation/foundation.topbar",
    "parseEmail" :  "parsing/parseEmail",
    "LabelView" : "views/LabelView",
    'socketio': '../socket.io/socket.io',
    "zepto" : 'lib/zepto'
    // "emailTemplate" : "templates/emailTemplate.html"

  },
  shim: {
    'zepto':{
        exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "zepto"],
      exports: 'Backbone'
    },
    'bootstrap' : {
        deps: ["zepto"]
    },
    'jquery-ui' : {
        deps : ["zepto"]
    },
    'marionette' : {
      deps : ["backbone", "underscore", "zepto"],
      exports: 'Marionette'
    },
    "foundation": {
            deps: ["jquery"]
    },
    "foundation.alerts": {
        deps: ["foundation"]
    },
    "foundation.clearing": {
        deps: ["foundation"]
    },
    "foundation.cookie": {
        deps: ["foundation"]
    },
    "foundation.dropdown": {
        deps: ["foundation"]
    },
    "foundation.forms": {
        deps: ["foundation"]
    },
    "foundation.joyride": {
        deps: ["foundation"]
    },
    "foundation.magellan": {
        deps: ["foundation"]
    },
    "foundation.orbit": {
        deps: ["foundation"]
    },
    "foundation.placeholder": {
        deps: ["foundation"]
    },
    "foundation.reveal": {
        deps: ["foundation"]
    },
    "foundation.section": {
        deps: ["foundation"]
    },
    "foundation.tooltips": {
        deps: ["foundation"]
    },
    "foundation.topbar": {
        deps: ["foundation"]
    },
    'socketio': {
      exports: 'io'
    },
    },
});

require(

  [
    "underscore",
    "backbone",
    "less",
    "marionette",
    "MyApp",
    "socketio",
    "foundation.alerts",
    "foundation.clearing",
    "foundation.cookie",
    "foundation.dropdown",
    "foundation.forms",
    "foundation.joyride",
    "foundation.magellan",
    "foundation.orbit",
    "foundation.placeholder",
    "foundation.topbar",
    "foundation.reveal",
    "foundation.section",
    "foundation.tooltips",
    "foundation.topbar",

  ],
  function(_, Backbone, less, Marionette, MyApp, io) {
    
    $(document).foundation();
        // $.ajax({
        //   type: "GET",
        //   url: '/user',
        //   success :function(data){
        //     window.user  = data;
        //   }
        // });

    // $( document ).ready(function() {
    //     window.socket = io.connect('http://localhost:3000');
    // });
    
        // var socket = io.connect('http://localhost:3000');
        //   socket.on('news', function (data) {
        //   console.log(data);
        //   // socket.emit('my other event', { my: 'data' });
        // });

    // $('.sendEmail').on('click',function(){
    //     console.log("why is this not working");
    //     $.ajax({
    //       type: "POST",
    //       url: '/incomingFake',
    //       data: {data : $("#fake-email").val()}
    //     });
    // });


  });


