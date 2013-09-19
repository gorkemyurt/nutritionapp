/**
 * Controllers
 */

var posts = require('../app/controllers/posts')
var users = require('../app/controllers/users')


/**
 * Expose routes
 */


module.exports = function (app, passport) {

 // twitter auth
	
	app.get('/auth/google', passport.authenticate('google', {scope : [ 'openid', 'email', "https://www.googleapis.com/auth/calendar"]}));

	app.get('/oauth2callback',  
		passport.authenticate('google', { failureRedirect: '/auth/google' }), 
		function(req,res){
			// console.log(req);
			res.redirect("/");

	});

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});
	
	app.get('/', users.login);

	app.post('/incomingmail', users.getEmail);

	app.post('/incomingFake', users.getFake);

	app.post('/emails', users.getFake);
	
	app.get('/emails', users.emails);
	// app.get('/projects', posts.projects);
	// app.get('/posts', posts.postlist);


}