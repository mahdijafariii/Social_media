const successResponses = (res, statusCode = 200 , data)=>{
    return res.status(statusCode).json({status : statusCode , success : true , data});
}

const errorResponses = (res,statusCode , message , data)=>{
    console.log({message , data}) /// log error
    return res.status(statusCode).json({
        status: statusCode,
        success : false,
        message : data
    });
}

module.exports = {successResponses , errorResponses}