const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// google authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/search');
});


module.exports = router;
