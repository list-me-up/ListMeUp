var router = require('express').Router();
var userCtrl = require('../controllers/users');
var listCtrl = require('../controllers/lists');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

router.get('/list', isLoggedIn, listCtrl.index);
router.get('/users/list/:id', isLoggedIn, listCtrl.show);
router.post('/users/list', isLoggedIn, listCtrl.create);
router.delete('/users/list/:id', isLoggedIn, listCtrl.delete);
router.put('/users/list/:id', isLoggedIn, listCtrl.update);

module.exports = router;