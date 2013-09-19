define([
	"marionette",
	"EmailsView",
  "FormView",
	"Emails",
  "LabelView",
  "NoEmailView"
	], function (Marionette, EmailsView, FormView, Emails , LabelView, NoEmailView) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    MyApp.addRegions({
	      list: "#list",
        form: "#form",
        label: "#label",
        welcome: "#welcome"
    });

    MyApp.addInitializer(function(){
          MyApp.emails = new Emails();
          console.log(MyApp.emails.length);
         var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
          var that = this;
          MyApp.emails.fetch().complete(function(){       
                _.each(MyApp.emails.models, function(item){
                    item.set("Date", months[new Date(item.get("Date")).getMonth()] + " " + new Date(item.get("Date")).getUTCDate() + " " + new Date(item.get("Date")).getHours() + ":" + new Date(item.get("Date")).getMinutes());
                });
                if(MyApp.emails.length > 0 ){

                    MyApp.label.show(new LabelView());
                    MyApp.list.show(new EmailsView({collection: MyApp.emails }));

                }
                else{
                  console.log("THATS WHY IT DOESNT WORK");
                  MyApp.welcome.show(new NoEmailView());
                }
         });
    });

    MyApp.start();
    return MyApp;
});