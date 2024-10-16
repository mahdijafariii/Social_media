const userModel = require('../../models/User');
const {errorResponses, successResponses} = require("../../utils/responses");
const {registerValidationSchema} = require("./auth.validator");

const register = async (req,res)=>{
    const {password , name , email , username } = req.body;

    await registerValidationSchema.validate({email,name,username,password},{
        abortEarly : false
    });

    const isExistUser = await userModel.findOne({username}).lean();
    if(isExistUser){
        return errorResponses(res,400,"This user already exist !!")
    }

    const isFirstUser = await userModel.countDocuments() === 0;
    let role = "USER";
    if(isFirstUser){
        role = "ADMIN";
    }

    user = new userModel({email,password,name,username});
    await user.save();

    return successResponses(res,201,{
        message : "User added successfully !!",
        user : { ...(user.toObject()), password : undefined}
    })


};

const showRegisterView = async (req,res)=>{
    return res.render('auth/register');
}


module.exports = {register , showRegisterView};