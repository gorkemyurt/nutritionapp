
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
    "LabelView" : "views/LabelView"
    // "emailTemplate" : "templates/emailTemplate.html"

  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    'bootstrap' : {
        deps: ["jquery"]
    },
    'jquery-ui' : {
        deps : ["jquery"]
    },
    'marionette' : {
      deps : ["backbone", "underscore", "jquery"],
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
    }
    },
});

require(

  ["jquery",
    "underscore",
    "backbone",
    "less",
    "marionette",
    "MyApp",
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
  function($, _, Backbone, jqueryui, less, Marionette, MyApp) {
    
    $(document).foundation();

    // $('.sendEmail').on('click',function(){
    //     console.log("why is this not working");
    //     $.ajax({
    //       type: "POST",
    //       url: '/incomingFake',
    //       data: {data : $("#fake-email").val()}
    //     });
    // });


  });


