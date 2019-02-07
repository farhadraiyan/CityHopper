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
                var newUser = new User();   
                console.log(req.body)
                newUser.firstName = req.body.firstname;
                newUser.lastName = req.body.lastname;
                newUser.email = req.body.email;
                newUser.hash = newUser.setPassword(req.body.password);
                newUser.country = req.body.country;
                newUser.province = req.body.province;
                newUser.city = req.body.city;
                newUser.phoneNumber = req.body.phoneNumber;
                newUser.termsCondition = req.body.termsCondition;
                newUser.userType = req.body.userType;
                newUser.phoneNumber = req.body.phone;
                newUser.termsCondition = req.body.terms = {"checked":true, "not_checked":false}
                // if(req.body.not_checked){
                //     newUser.termsCondition = req.body.not_checked;
                // }else{
                //     newUser.termsCondition = req.body.check;
                //     console.log(req.body.check);
                // }
                //newUser.termsCondition
            
               console.log(newUser);
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

