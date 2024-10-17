const hasAccessToPage = require('../../utils/hasAccessToPage')
const followModel = require('../../models/Follow')
const userModel = require('../../models/User');
const getPage = async (req,res,next) =>{
    try {
        const {pageId} = req.params;
        const user = req.user;
        const hasAccess = await hasAccessToPage(user._id,pageId);

        const followed = await followModel.findOne({follower : userId , following: pageId}).lean();

        if(!hasAccess){
            req.flash('error', "Please follow to see content !!");
            return res.render('pages/index',{
                followed : Boolean(followed)
            });
        }
        return res.render('pages/index',{
            followed : Boolean(followed)
        });
    }
    catch (error){
        next(error);
    }
}

const follow = async (req,res,next)=>{
    try {
        const pageId = req.params;
        const user = req.user;

        const targetOwnPage = await userModel.findOne({_id : pageId}).lean();
        if(!targetOwnPage){
            req.flash('error', "page not found !!");
            return res.redirect(`pages/${pageId}`);
        }

        const hasFollowedBefore = await followModel.findOne({follower : user._id, following : pageId}).lean();
        if(hasFollowedBefore){
            req.flash('error', "page already followed !!");
            return res.redirect(`pages/${pageId}`);
        }

        if(user._id.toString() === pageId){
            req.flash('error', "you can not follow yourself !!");
            return res.redirect(`pages/${pageId}`);
        }

        await followModel.create({
            follower : user._id,
            following : pageId,
        })
        req.flash('success', "followed successfully !!");
        return res.redirect(`pages/${pageId}`);
    }
    catch (error) {
        next(error)
    }
}

const unfollow = async (req,res,next)=>{
    try {

    }
    catch (error) {
        next(error);
    }
}

module.exports = {getPage,follow,unfollow}