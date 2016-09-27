
var passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    models          = require('../models'),
    bcrypt          = require('bcryptjs');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {

        var user = new models.User({ email: username }).fetch()

        user.then((user) => {
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare(password, user.get('password'), function(err, res) {
                if (!res) return done(null, false, { message: 'Incorrect password.' });
                return done(null, user);
            });

        }).catch((err) => {
            console.log(err);
            if (err) { return done(err); }
        });

    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var user = new models.User({ id: id }).fetch();
    user.then((user) => {
        done(undefined, user);
    }).catch((err) => {
        done(err, undefined)
    });
});

module.exports = passport;
