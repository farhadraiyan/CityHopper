var user = require('../models/user');
var passport = require('passport');

exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;

        if(err){
            console.log(err);
            res.status(404);
        }else{
            
        }
    })
}