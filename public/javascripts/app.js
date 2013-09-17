define([
	"marionette",
	"EmailsView",
	"Emails"
	], function (Marionette, EmailsView, Emails) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    MyApp.addRegions({
	      list: "#list"
    });

    MyApp.addInitializer(function(){
	      MyApp.emails = new Emails(); 
          console.log(MyApp.emails); 
	      MyApp.list.show(new EmailsView({collection: MyApp.emails}));
    });

    MyApp.start();
    return MyApp;
});