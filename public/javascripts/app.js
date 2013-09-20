define([
	"marionette",
	"EmailsView",
  "FormView",
	"Emails",
  "LabelView",
  "NoEmailView"
	], function (Marionette, EmailsView, FormView, Emails , LabelView, NoEmailView) {

    // set up the app instance
    var MyApp = new Backbone.Marionette.Application()

    MyApp.addRegions({
	      list: "#list",
        form: "#form",
        label: "#label",
        welcome: "#welcome"
    });


    MyApp.emails = new Emails();


    function conditional(){
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
                    MyApp.welcome.close();

                }
                else{
                  console.log("THATS WHY IT DOESNT WORK");
                  MyApp.welcome.show(new NoEmailView({collection: MyApp.emails }));

                }
         });
    }

    function conditionalNoFetch(){
       if(MyApp.emails.length > 0 ){
            MyApp.label.show(new LabelView());
            MyApp.list.show(new EmailsView({collection: MyApp.emails }));
            MyApp.welcome.close();

        }
        else{
          console.log("THATS WHY IT DOESNT WORK");
          MyApp.welcome.show(new NoEmailView({collection: MyApp.emails }));

        }

    }

    MyApp.addInitializer(function(){
        MyApp.listenTo(MyApp.emails, 'refresh', conditionalNoFetch);
        conditional();
    });

    MyApp.start();
    return MyApp;
});