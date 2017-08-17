var router = require('express').Router();
var apiCtrl = require('../controllers/api');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

router.get('/jokes', apiCtrl.getJokes);
router.get('/list', isLoggedIn, apiCtrl.index);
router.post('/users/list', isLoggedIn, apiCtrl.create);
router.put('/users/list/:id', isLoggedIn, apiCtrl.update);
router.delete('/users/list/:id', isLoggedIn, apiCtrl.delete);

module.exports = router;