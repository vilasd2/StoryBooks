module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) { // C6
            return next();
        }
        res.redirect('/');
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }

    }
}