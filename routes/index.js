var router = require('express').Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route (can add a new custom route, for now it's root)
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/list',
    failureRedirect : '/'
  }
));

// OAuth logout route (can add a new custom route, for now it's root)
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;