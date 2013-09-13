define([
	"marionette",
	"FormView",
	"UsersView",
	"Users"
	], function (Marionette, FormView, UsersView, Users) {

    // set up the app instance
    var MyApp = new Marionette.Application();
    MyApp.addRegions({
	      form : "#form",
	      list: "#list"
    });

    MyApp.addInitializer(function(){
	      console.log("gorkem");
	      MyApp.users = new Users();  
	      MyApp.form.show(new FormView ({collection: MyApp.users}));
	      MyApp.list.show(new UsersView({collection: MyApp.users}));
    });
    MyApp.start();
    return MyApp;
});