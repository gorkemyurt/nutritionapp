define([
	"marionette",
	"EmailsView",
    "FormView",
	"Emails"
	], function (Marionette, EmailsView, FormView, Emails) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    MyApp.addRegions({
	      list: "#list",
          form: "#form"
    });

    MyApp.addInitializer(function(){
	      MyApp.emails = new Emails();

	      MyApp.list.show(new EmailsView({collection: MyApp.emails }));
          MyApp.form.show(new FormView({collection: MyApp.emails}));

    });

    MyApp.start();
    return MyApp;
});