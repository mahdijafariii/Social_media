const jwt = require('jsonwebtoken');
const userModel = require('../../src/models/User');

module.exports = async (req,res,next)=>{
    try {
        req.cookie
    }
    catch (error){
        next(error)
    }

}