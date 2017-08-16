var router = require('express').Router();
var listCtrl = require('../controllers/lists');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/list/:id', isLoggedIn, listCtrl.show);
router.put('/list/:id', isLoggedIn, listCtrl.update);

module.exports = router;