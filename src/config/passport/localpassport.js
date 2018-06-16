const localStrategy = require('passport-local').Strategy

const User = require('../../model/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            user.Local.last_login = Date.now();
            user.save()
                .then(() => done(err, user))
        })
    })

    // SignUp
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
        function (req, email, password, done) {
            User.findOne({ 'Local.email': email }, function (err, user) {
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, req.flash('signupmessage', 'The email is already taken'));
                } else {
                    var newUser = new User();
                    newUser.Local.email = email;
                    newUser.Local.username = req.body.username; 
                    newUser.Local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    })
                }
            })
        }));

    // Login
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true    
    },
        function (req, email, password, done){
            User.findOne({'Local.email': email}, function (err, user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false, req.flash('signupmessage', 'No email found'));
                }
                if(!user.validatePassword(password)){
                    return done(null, false, req.flash('signupmessage', 'Invalid password'))
                }
                User.update({_id: user._id}, user.Local.last_loggin = Date());

                return done(null, user);
            })
        }
    ));


    // SignUpADMIN
    passport.use('local-signup-Admin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
        function (req, email, password, done) {
            User.findOne({ 'Local.email': email }, function (err, user) {
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, req.flash('signupmessage', 'The email is already taken'));
                } else {
                    var newUser = new User();
                    newUser.Local.email = email;
                    newUser.Local.username = req.body.username; 
                    newUser.Local.admin = true;
                    newUser.Local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    })
                }
            })
        }));

    // LoginADMIN
    passport.use('local-login-Admin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true    
    },
        function (req, email, password, done){
            User.findOne({'Local.email': email}, function (err, user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false, req.flash('signupmessage', 'No email found'));
                }
                if(!user.validatePassword(password)){
                    return done(null, false, req.flash('signupmessage', 'Invalid password'))
                } else {
                    if(user.Local.admin == false){
                        return done(null, false, req.flash('signupmessage', 'Not at admin'));
                    }            
                    return done(null, user);
                }
                
            })
        }
    ));
}   