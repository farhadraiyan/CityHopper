
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
let joiConfigTrip=function(reqBody)
{
    // ["from", "to","cost","departureTime","arivalTime","driver",
    // "passengers","rating","car"]
    const joiSchema=Joi.object().keys({
        from:Joi.required(),
        to:Joi.required(),
        cost:Joi.number().strict().required(),
        departureTime:Joi.date().iso(),
        arivalTime:Joi.date().iso().min(Joi.ref('departureTime')),
        driver:Joi.required(),
        passengers:Joi.array().required(),
        rating:Joi.number().strict().required(),
        car:Joi.required()

        
    })
    let joiResult=Joi.validate(reqBody,joiSchema,{abortEarly:false})
    return joiResult

}
let tripErrors=function(errorsdetails)
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
    joiConfigPlace,
    placeErrors,
    joiConfigTrip,
    tripErrors
}