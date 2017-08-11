var express = require('express');
var router = express.Router();
var User = require('./../controllers/users');

// user settings

// map location

// notification settings


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function(req, res) {
  res.render('users/login');
})


/* GET users listing. */
router.get('/new', function (req, res, next) {
  res.render('map');
});

module.exports = router;
