const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        // find the user
        const user = getUserByEmail(email);

        if (user == null) {
            return done(null, false, {message: 'No student with that email'})
        }

        // use bcrypt
        try {
            if (await bcrypt.compare(password, student.password)) {
                return done(null, user, {message: "user logged in successfully"})
            }
            else {
                return done(null, false, {message: "The password doesn't match"})
            }
        } 
        catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize;