const jwt = require('jsonwebtoken');
const userModel = require('../../src/models/User');

module.exports = async (req,res,next)=>{
    try {
        const token = req.cookies['access-token']
        if(!token){
            req.flash('error', 'Please login first!');
            return res.redirect('/auth/login');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            req.flash('error', 'Please login first!');
            return res.redirect('/auth/login');
        }
        const userId = payload.userId;
        const user = await userModel.findById({_id : userId}).lean();
        if(!user){
            req.flash('error', 'Please login first!');
            return res.redirect('/auth/login');
        }
        req.user = user;
        next();
    }
    catch (error){
        next(error)
    }

}