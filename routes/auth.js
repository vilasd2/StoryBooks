const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // C1

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/dashboard');// Successful authentication.
    });

router.get('/verify', (req, res) => {
    if (req.user) {
        console.log("req.user :"+req.user);
    }
    else {
        console.log('Not Auth');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;