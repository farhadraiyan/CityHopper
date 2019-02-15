const Joi=require("joi");

 

let userRequirements = function (firstName,lastName,country,privince,city/*,phoneNumber,description,DateOfBirth*/ ){
    
    const checkValidation =Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        country:Joi.string(),
        privince:Joi.string(),
        city:Joi.string(),
        //phoneNumber:Joi.required().phoneNumber(),
        //description:Joi.max(100),
        //dateOfBirth: Joi.date()
    })

    let result = []
    Joi.validate({ firstName,lastName,country,privince,city/*,phoneNumber,description,DateOfBirth*/ }, checkValidation, function (err, value) {
        if(err){
            result.push({
                key: err.path,
                message: err.message
            });
        
        }else{
            result = value
        }
     });
    return result;
    
}

module.exports={
    userRequirements
}