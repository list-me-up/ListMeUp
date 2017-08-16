var express = require('express');
var router = express.Router();
var userCtrl = require('./../controllers/users');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/list', isLoggedIn, userCtrl.index);
router.get('/list', isLoggedIn, userCtrl.list)
router.get('/settings', isLoggedIn, userCtrl.settings);
router.put('/settings', isLoggedIn, userCtrl.update);

module.exports = router;