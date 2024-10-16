const userModel = require('../../models/User');
const {errorResponses, successResponses} = require("../../utils/responses");
const {registerValidationSchema} = require("./auth.validator");
const jwt = require('jsonwebtoken');
const refreshTokenModel = require('../../models/RefreshToken')
const {maxAge} = require("express-session/session/cookie");
const register = async (req,res)=>{
    const {password , name , email , username } = req.body;

    await registerValidationSchema.validate({email,name,username,password},{
        abortEarly : false
    });

    const isExistUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });
    if(isExistUser){
        req.flash('error' ,"This user already exist !!" )
        return res.redirect('/auth/register')
        // return errorResponses(res,400,"This user already exist !!")
    }

    const isFirstUser = await userModel.countDocuments() === 0;
    let role = "USER";
    if(isFirstUser){
        role = "ADMIN";
    }

    let user = new userModel({email,password,name,username});
    await user.save();
    const accessToken = jwt.sign({userId : user._id} , process.env.JWT_SECRET , {
        expiresIn : '30day'
    })
    res.cookie("access-token", accessToken, {maxAge : 900000 , httpOnly : true});

    const refreshToken = await refreshTokenModel.createToken(user);
    res.cookie("refresh-token", accessToken, {maxAge : 900000 , httpOnly : true});


    req.flash("success", "Signed up was successfully");
    return res.redirect("/auth/register");
    // return successResponses(res,201,{
    //     message : "User added successfully !!",
    //     user : { ...(user.toObject()), password : undefined}
    // })
};

const showRegisterView = async (req,res)=>{
    return res.render('auth/register');
}


module.exports = {register , showRegisterView};