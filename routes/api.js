var router = require('express').Router();
var userCtrl = require('../controllers/users');
var listCtrl = require('../controllers/lists');


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

// GET /api/students
router.get('/list', isLoggedIn, listCtrl.index);


// POST /api/facts
router.post('/users/list', isLoggedIn, listCtrl.create);
// router.post('/users/list',function(req, res) {
//     console.log("LOADDEEDD");
// });

// DELETE /api/facts/:id
// router.delete('/facts/:id', isLoggedIn, (req, res) => {
//   console.log('aosidjfoasidjfoasidfj')

//   res.send('poop')
// });
// router.delete('/facts/:id', isLoggedIn, factsCtrl.delete);

module.exports = router;