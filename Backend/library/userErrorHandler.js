const Joi=require("joi");

 

let userRequirements = function (firstName,lastName,country,privince,city,DateOfBirth ){
    
    const checkValidation =Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        country:Joi.string(),
        privince:Joi.string(),
        city:Joi.string(),
        dateOfBirth: Joi.date()
    })

    let result = []
    Joi.validate({ firstName,lastName,country,privince,city,DateOfBirth }, checkValidation, function (err, value) {
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