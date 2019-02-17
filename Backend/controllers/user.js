var User = require('../models/user');
const errorHandler = require('../library/userErrorHandler');
const _ = require('lodash')
var passport = require('passport');

exports.findAll = (req, res) => {
    User.find().then(
        (result) => {
            res.json(result)
        }
    ).catch(err => {
        console.log(err)
    })
}

exports.register = async (req, res) => {
    User.findOne({email: req.body.email}).then(
        (result) =>{
            if(result){
                res.json({
                    message: 'User already exists'
                })
            }else{
                // Creates an object From userSchema
                var newUser = new User();   
                // console.log(req.body)
                // const {firstname, lastname, email, hash, country, province, city, phoneNumber, termsCondition, userType} = req.body;
                newUser.firstName = req.body.firstname;
                newUser.lastName = req.body.lastname;
                newUser.email = req.body.email;
                newUser.hash = newUser.setPassword(req.body.password);
                newUser.country = req.body.country;
                newUser.province = req.body.province;
                newUser.city = req.body.city;
                newUser.phoneNumber = req.body.number;
                newUser.termsCondition = req.body.terms;
                newUser.userType = req.body.userType;
            
               console.log(newUser);
               User.create(newUser, async (err) => {
                if(err){
                    res.json({
                        msg: err + " -> Add user failed"
                    })
                }else{
                    let data = _.pick(newUser, [ '_id', 'firstName', 'lastName', 'email', 'country', 'province', 'city', 'phoneNumber', 'userType'])
                    var token;
                    token = await newUser.generateJwt();
                    data.token = token;
                    res.json({
                        msg: newUser.firstName + "-> User Added",
                        user: data
                    })
                }
            })
        }
    }

    ).catch(err => {
        console.log(err)
    });
}

exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;
         // If Passport throws/catches an error
        if(err) {
            res.status(404).json(err)
            return;
        }

        if(user){
            //if user found 
            token = user.generateJwt();
            res.status(404);
            res.json({
                "token" : token
            })
        }else{
            //if user not found 
            res.status(401).json(info);
        }
    })(req, res)
};

exports.find = (req, res) => {
    User.findOne({
        email: req.params.email,
        password: req.params.password
    }).then(
        (result) => {
            if(!result) {
                res.json({message: 'User does not Exists'})
            }else{
                res.json(result)
            }
        }
    ).catch(err => {
        console.log(err)
    })
}



exports.deleteOne =  async function(req,res){
    try{
        await User.deleteOne({_id:req.params.id})
        res.status(200).send({
            message: "User deleted"
        })  
    }catch(error){
        res.status(404).send({
            message: "Error to delete",
            error: "cannot find the user"
        })

    }
}


exports.editOne = async function(req,res){

    let result = errorHandler.userRequirements(req.body.firstName,req.body.lastName,req.body.country,req.body.province,req.body.city);

    try{
        await User.updateOne({_id:req.params.id},{
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            country:req.body.country,
            province: req.body.province,
            city: req.body.city
        })
        res.status(200).send({
            message:result
        })
    }catch(error){
        res.status(404).send({
            message: "Error to edit",
            error: "cannot find the user"
        })
    }
  
}
    

