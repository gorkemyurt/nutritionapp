define([
  'zepto',
	"marionette",
	"EmailsView",
  "FormView",
	"Emails",
  "LabelView",
  "NoEmailView"
	], function ($, Marionette, EmailsView, FormView, Emails , LabelView, NoEmailView) {

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
        var that = this;
        console.log($);
        MyApp.emails.fetch( {success : function(){      
              if(MyApp.emails.length > 0 ){

                  MyApp.label.show(new LabelView());
                  MyApp.list.show(new EmailsView({collection: MyApp.emails }));
                  MyApp.form.show(new FormView({collection: MyApp.emails }));

                  MyApp.welcome.close();

              }
              else{
                console.log("THATS WHY IT DOESNT WORK");
                MyApp.welcome.show(new NoEmailView({collection: MyApp.emails }));

              }
        }});
    }

    // function conditionalNoFetch(){
    //       if(MyApp.emails.length > 0 ){
    //           MyApp.label.show(new LabelView());
    //           MyApp.list.show(new EmailsView({collection: MyApp.emails }));
    //           MyApp.welcome.close();

    //       }
    //       else{
    //         console.log("THATS WHY IT DOESNT WORK");
    //         MyApp.welcome.show(new NoEmailView({collection: MyApp.emails }));

    //       }

    // }

    MyApp.addInitializer(function(){
        MyApp.listenTo(MyApp.emails, 'refresh', conditional);
        conditional();
    });

    MyApp.start();
    return MyApp;
});