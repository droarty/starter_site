var User = require('./user.js');

routes_for_client = function(app) {
  // routes
  app.get('/', function(req, res) {
    res.render('index', { title: "Welcome to the UIC Principal's Network"});
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
}

module.exports = routes_for_client;

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
