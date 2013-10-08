define([
  'zepto',
	"marionette",
	"EmailsView",
  "FormView",
	"Emails",
  "LabelView",
  "NoEmailView",
  "Email",
  "LoadingView",
  "DatePickerView",
  "ListView",
  "currentDate"
	], function ($, Marionette, EmailsView, FormView, Emails , LabelView, NoEmailView, Email, LoadingView, DatePickerView, ListView, currentDate) {

    // set up the app instance
    var MyApp = new Backbone.Marionette.Application()

    MyApp.addRegions({
	      list: "#list",
        form: "#form",
        label: "#label",
        welcome: "#welcome",
        datePicker : "#datePicker",
        breakfast : "#breakfast",
        lunch : "#lunch",
        dinner : "#dinner"
    });


    MyApp.emails = new Emails();
    MyApp.datePickerView = new DatePickerView({model : new currentDate({ displayDate : new Date()})});

    function conditional(dataObject){
        var that = this;
        if(!dataObject){
          dataObject = new Date();
        }
        MyApp.emails.fetch( { data : {Date : dataObject}, success : function(smt, res){
              MyApp.emails = new Emails(res.data);
              
              if(res.render == true ){

                  $(".load").hide();
                  var ListRegion = new ListView({ model : new Email(), collection: MyApp.emails  });
                  MyApp.label.show(new LabelView());
                  MyApp.list.show(ListRegion);

                  ListRegion.breakfast.show(new EmailsView({ type : 1, collection: new Emails(MyApp.emails.where({Type : 1}))}));
                  ListRegion.lunch.show(new EmailsView({ type : 2, collection: new Emails(MyApp.emails.where({Type : 2}))}));
                  ListRegion.dinner.show(new EmailsView({ type : 3 ,collection: new Emails(MyApp.emails.where({Type : 3}))}));

                  MyApp.datePicker.show(MyApp.datePickerView);

                  MyApp.welcome.close();
              }

              else{
                console.log("no length");
                $(".load").hide();
                MyApp.welcome.show(new NoEmailView({collection: MyApp.emails, model : new Email() }));

              }
        }});
    }

    MyApp.addInitializer(function(){
        MyApp.listenTo(MyApp.emails, 'refresh', conditional);
        MyApp.listenTo(MyApp.datePickerView, 'refresh', function(data){
          MyApp.breakfast.reset();
          MyApp.lunch.reset();
          MyApp.dinner.reset();

          conditional(data);
        });

        conditional();

    });

    MyApp.start();
    return MyApp;
});