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
          console.log(MyApp.emails.length);
         var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
          var that = this;
          MyApp.emails.fetch().complete(function(){       
                _.each(MyApp.emails.models, function(item){
                    item.set("Date", months[new Date(item.get("Date")).getMonth()] + " " + new Date(item.get("Date")).getUTCDate());
                });
                MyApp.list.show(new EmailsView({collection: MyApp.emails }));
         });
    });

    MyApp.start();
    return MyApp;
});