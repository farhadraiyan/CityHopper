
const Joi=require("joi")
//place config
let joiConfigPlace=function(reqbody)
{
    
    const joiSchema=Joi.object().keys({
        
        name:Joi.string().required(),
        navPointType:Joi.string().required(),
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
        name:Joi.string().required(),
        from:Joi.required(),
        to:Joi.required(),
        cost:Joi.number().strict().required(),
        departureTime:Joi.date(),
        arivalTime:Joi.date().min(Joi.ref('departureTime')),
        seatsAvailable:Joi.number().required(),
        luggage:Joi.string().required(),
        driver:Joi.required(),
        passengers:Joi.array(),
        rating:Joi.number().strict(),
        car:Joi.string()
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