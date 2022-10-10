const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/auth");

router.get('/home', (req, res, next) => {
    const form = '<h1>You are successfully logged in</h1>\
            <br><a href="/students">Check the students List</a>\
            <br><br><a href="/logout">Log Out</a>'
            res.send(form);
});

router.get('/login', (req, res, next) => {
    console.log(req.isAuthenticated())
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="/register">\
    Enter name:<br><input type="text" name="name">\
    <br>Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
    
});

router.post("/register", controller.registerUser);

router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: 'this is my' + err });
            }
            // return res.status(200).json({ success: `logged in ${user.id}` });
            res.redirect('/home');
        });
    })(req, res, next);
});

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home' }));


router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
});


module.exports = router;