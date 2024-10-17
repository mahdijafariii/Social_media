const followModel = require('../models/Follow');
const userModel = require('../models/User')
module.exports = async (userId , pageId, next)=>{
    try {
        if(userId === pageId) return true;

        const page = await userModel.findOne({_id : pageId}).lean();
        if (!page.private){
            return true;
        }

        const followed = await followModel.findOne({follower : userId , following: pageId}).lean();
        if(!followed) return false;

        return false;
    }
    catch (error){
        next(error);
    }
}