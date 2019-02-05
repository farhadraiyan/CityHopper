
const Joi=require("joi")

let joiConfig=function(reqbody)
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

module.exports={
    joiConfig,
    placeErrors
}