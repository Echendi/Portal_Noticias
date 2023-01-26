const express = require('express');
const router = express.Router();
const db = require('../util/database');

router.get('/login', function (req, res, next) {
    passport.authenticate('local.login', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send(userLogged = { id: user.id, username: user.username });
        });
    })(req, res, next);
});
module.exports = router;