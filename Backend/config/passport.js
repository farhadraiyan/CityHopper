const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('user')

// this method will find the user based on email from mongoose query and varify if the user password is wrong or correct
// We will only be using email because of the unique identifier.

passport.use(new LocalStrategy({
    usernameField: 'email'
},(useremail, password, done)=>{
    User.findOne({email: useremail}, (err, user)=>{
        if (err) {return done(err); }
        
        if(!user) {
            return done(null, false, {
                message: "User Not Found"
            });
        }

        if(!user.validPassword(password)){
            return done(null, false, {
                message: "Password is wrong"
            });
        } 

        if(!user.confirmed){
            return done(null, false, {
                message: "Email is not varified"
            })
        }
        return done(null, user);
    });
}));