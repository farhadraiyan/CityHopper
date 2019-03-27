var User = require('../models/user');
const errorHandler = require('../library/userErrorHandler');
const _ = require('lodash')
var passport = require('passport');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const keys = require('./../config/config')
var Image = require('../models/image')
const fs = require('fs')


exports.findAll = (req, res) => {
    User.find().then(
        (result) => {
            res.json(result)
        }
    ).catch(err => {
        console.log(err)
    })
}
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "cityhopper0@gmail.com",
      pass: "ChoppHopp123",
    }
  });



exports.register = async (req, res) => {
    User.findOne({ email: req.body.email }).then(
        (result) => {
            if (result) {
                res.json({
                    message: 'User already exists'
                })
            } else {
                // Creates an object From userSchema
                var newUser = new User();
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


                newUser.tempToken = newUser.email_generateJwt()
                
                const url = `http://localhost:3000/user/confirmation/${newUser.tempToken}`;
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

                    await transporter.sendMail({
                        to: newUser.email,
                        subject: "Confirmation Email",
                        html: `Please Check this email and confirm your email: <a href="${url}">${url}</a>`
                    })
                    console.log('message Send!')

                    
                }
            })
        }
    }).catch(err => {
        console.log(err)
    });
}

exports.confirmation = async function(req, res) {
    let user
    let token = req.params.token
    let verifiedToken     
    try {
        verifiedToken = await jwt.verify(token, keys.EMAIL_SECRET)
    } catch (error) {
        res.status(403).send({
            message: "Error confirming",
            error: error.message
        })
    }
        try {
        user = await User.findById(verifiedToken._id)
        console.log(user)
    } catch (error) {
        res.status(403).send({
            message: "Error getting user details",
            error: error.message
        })
    }
    
    let confirmedUser
   
    user.confirmed = true
    try {
        confirmedUser = await user.save()
        res.status(200).send({
            user: confirmedUser,
            message: "Account Activated"
        })
    } catch (error) {
        res.status(403).send({
            message: "Error saving the user confirmation",
            error: error.message
        })
    }
}

exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err)
            return;
        }

        if (user) {
            //if user found 
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            })
        } else {
            //if user not found 
            console.log("The Account is unauthorized to access")
            res.status(401).json(info);
        }
    })(req, res)
};

exports.find = async function (req, res) {
    try {
        let newUser = await User.findOne({ _id: req.params._id })
        res.status(200).send({
            user: newUser
        })
    } catch (error) {
        res.status(404).send({
            message: "Not find",
            error: error.message
        })
    }
}



exports.deleteOne = async function (req, res) {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200).send({
            message: "User deleted"
        })
    } catch (error) {
        res.status(404).send({
            message: "Error to delete",
            error: "cannot find the user"
        })

    }
}


exports.editOne = async function (req, res) {

    let result = errorHandler.userRequirements(req.body.firstName, req.body.lastName, req.body.country, req.body.province, req.body.city);

    try {
        await User.updateOne({ _id: req.params.id }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            province: req.body.province,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
            description: req.body.description,
            dateOfBirth: req.body.dateOfBirth
        })
        res.status(200).send({
            message: req.body.phoneNumber
        })
    } catch (error) {
        res.status(404).send({
            message: "Error to edit",
            error: "cannot find the user"
        })
    }
}

exports.updateEmail = async function(req, res){
    try{
    var nUser = new User();
    nUser.email = req.body.email;
    nUser.confirmed = true;
   // nUser.tempToken = nUser.email_generateJwt();
    var user = {
        email: nUser.email,
        confirmed: nUser.confirmed,
      //  tempToken: nUser.tempToken
    }
    const url = `http://localhost:3000/user/confirmation/${nUser.tempToken}`;
    try{ 
        await User.updateOne({_id:req.body.userId},user)
            
            res.status(200).send({
                message: user.email + "Add",
                user: user.confirmed
            })
            // await transporter.sendMail({
            //     to: user.email,
            //     subject: "Confirmation Email",
            //     html: `Please Check this email and confirm your email: <a href="${url}">${url}</a>`
            // })
            // console.log('message Send!')
        } catch(error){
            res.json({
                message: error
            })
        } 
    } catch(err){
        res.status(404).send({
            message: "Error updating email",
            err: err
        })
    }

}

exports.updatePassword = async function(req, res){
    let user
    try {
        user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(404).send({
            message: 'User not found'
            })
        }
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }

    var reqhash = user.addPassword(req.body.password, user.salt);
    if (user.hash !== reqhash) {
        return res.status(403).send({
            error: "Invalid Password"
        })
    }

    let newPassword = req.body.newPassword
    let savedUser
    try {
        savedUser = await user.setPassword(newPassword)
        if (!savedUser) {
            return res.status(400).send({
                message: "Error occured"
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "Error occured",
            error: error.message
        })
    }

    res.status(200).send({
        message: "Password Updated SuccessFully",
        user: savedUser
    })
    

}

exports.uploadProfilePicture = async function (req, res) {
    let errors = {};
    let reqFields = ['userId'];
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field} is required`;
        };
    });

    if (Object.keys(errors).length > 1) {
        return res.status(400).send({
            message: "Error upload image",
            error: errors
        })
    }

    let userId = req.body.userId
    let user
    try {
        user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                message: "error uploading image, try again later"
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "error uploading image",
            error: error.message
        })
    }
    try {
        image = await new Image({
            type: req.file.mimetype,
            data: fs.readFileSync(req.file.path),
            userId: user._id
        })
    } catch (error) {
        return res.status(400).send({
            message: "error creating new image",
            error: error.message
        })
    }
    let savedImage
    try {
        savedImage = await image.save()
        if (!savedImage) {
            return res.status(400).send({
                message: "error saving new image",
                error: "try again later please"
            })
        }
        fs.unlink(req.file.path, err => {
            if (err) throw err;
        })
    } catch (error) {
        return res.status(400).send({
            message: "error saving new image",
            error: error.message
        })
    }
    user.imageUrl = `http://localhost:3000/user/profile/picture/${savedImage._id}`
    let savedUser
    try {
        savedUser = await user.save()
        return res.status(200).send({
            user: savedUser,
            imageurl: `http://localhost:3000/user/profile/picture/${savedImage._id}`
        })

    } catch (error) {
        return res.status(400).send({
            message: "Image is saved but error assigning it to user",
            error: error.message
        })
    }
}

exports.getProfilePictureByUserID = async function (req, res) {
    let errors = {};
    let reqFields = ['id'];
    reqFields.forEach(function (field) {
        if (!req.params[field] || req.params[field] === '') {
            errors[field] = `${field} is required`;
        };
    });

    if (Object.keys(errors).length > 1) {
        return res.status(400).send({
            message: "Error upload image",
            error: errors
        })
    }
    let user = req.params.id
    let image
    try {
        image = await Image.find({ userId: user })
        if (!image) {
            return res.status(400).send({
                message: "image not found"
            })
        }
        res.contentType('image/jpeg');
        res.end(image.data, 'binary')
        return
    } catch (error) {
        return res.status(400).send({
            message: "error getting image",
            error: error.message
        })
    }
}
exports.getProfilePictureByID = async function (req, res) {
    let errors = {};
    let reqFields = ['id'];
    reqFields.forEach(function (field) {
        if (!req.params[field] || req.params[field] === '') {
            errors[field] = `${field} is required`;
        };
    });

    if (Object.keys(errors).length > 1) {
        return res.status(400).send({
            message: "error getting image",
            error: errors
        })
    }
    let imageId = req.params.id
    let image
    try {
        image = await Image.findById(imageId)
        if (!image) {
            return res.status(400).send({
                message: "image not found"
            })
        }
        res.contentType('image/jpeg');
        res.end(image.data, 'binary')
        return
    } catch (error) {
        return res.status(400).send({
            message: "error getting image",
            error: error.message
        })
    }
}

