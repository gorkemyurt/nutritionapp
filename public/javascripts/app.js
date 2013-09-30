define([
  'zepto',
	"marionette",
	"EmailsView",
  "FormView",
	"Emails",
  "LabelView",
  "NoEmailView",
  "Email",
  "LoadingView"
	], function ($, Marionette, EmailsView, FormView, Emails , LabelView, NoEmailView, Email, LoadingView) {

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
        // MyApp.list.show(new LoadingView());

        MyApp.emails.fetch( {success : function(){      
              if(MyApp.emails.length > 0 ){
                  $(".load").hide();
                  MyApp.label.show(new LabelView());
                  MyApp.list.show(new EmailsView({collection: MyApp.emails }));
                  MyApp.form.show(new FormView({ model : new Email(), collection: MyApp.emails  }));

                  MyApp.welcome.close();
              }

              else{
                $(".load").hide();
                MyApp.welcome.show(new NoEmailView({collection: MyApp.emails, model : new Email() }));

              }
        }});
    }

    MyApp.addInitializer(function(){
        MyApp.listenTo(MyApp.emails, 'refresh', conditional);
        conditional();

    });

    MyApp.start();
    return MyApp;
});