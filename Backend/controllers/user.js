var User = require('../models/user');



exports.findAll = (req, res) => {
    User.find().then(
        (result) => {
            res.json(result)
        }
    ).catch(err => {
        console.log(err)
    })
}

exports.register = (req, res) => {

    User.findOne({email: req.body.email}).then(
        (result) =>{
            if(result){
                res.json({
                    message: 'User Exists in Database'
                })
            }else{
                // Creates an object From userSchema
                var newUser = new User(
                    //{
                    // firstName: req.body.firstName,
                    // lastName: req.body.lastName,
                    // email: req.body.email,
                    // hash: req.body.hash,
                    // country: req.body.country,
                    // province: req.body.province,
                    // city: req.body.city,
                    // phoneNumber: req.body.phoneNumber,
                    // termsCondition: req.body.termsCondition,
                    // userType: req.body.userType
               // }
                );   
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.email = req.body.email;
                newUser.hash = newUser.setPassword(req.body.password);
                newUser.country = req.body.country;
                newUser.province = req.body.province;
                newUser.city = req.body.city;
                newUser.phoneNumber = req.body.phoneNumber;
                newUser.termsCondition = req.body.termsCondition;
                newUser.userType = req.body.userType;
                

               User.create(newUser, (err) => {
                if(err){
                    res.json({
                        msg: err + " -> Add user failed"
                    })
                }else{
                    res.json({
                        msg: newUser.firstName + "-> User Added",
                        user: newUser
                    })
                }
            })

        }

    }

    ).catch(err => {
        console.log(err)
    });
}

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

