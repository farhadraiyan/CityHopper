
const Joi=require("joi")
//place config
let joiConfigPlace=function(reqbody)
{
    
    const joiSchema=Joi.object().keys({
        name:Joi.string().required(),
        location:Joi.required()
    })
    let joiRes=Joi.validate(reqbody,joiSchema,{abortEarly:false})
    return joiRes;
}

//place errors functionality
let placeErrors=function(errorsdetails)
{
    errorArr=[]

    errorsdetails.forEach(function(detail) {
        errorArr.push({
            key: detail.path,
            message: detail.message
        });
    });
    return errorArr

}

//trip errors


module.exports={
    joiConfigPlace,
    placeErrors
}