// from https://github.com/mjhea0/passport-examples

// dependencies
var fs = require('fs');
var express = require('express');
// var routes = require('./routes');
var path = require('path');
var config = require('./oauth.js');
var User = require('./user.js');
var passport = require('./authentication.js');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'my_precious' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user.id);
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

// routes
app.get('/', function(req, res) {
  res.render('index', { title: "Welcome to the UIC Principal's Network"});
});
app.get('/login', function(req, res) {
  res.render('login', { title: "Login"});
});
app.get('/advanced', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
      res.render('login', {err: err})
    } else {
      res.render('advanced', { user: user});
    }
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/advanced');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// port
app.listen(1337);
console.log('listening on :1337')

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;
