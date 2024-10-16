const {createPostValidator} = require("./post.validator");
const postModel = require('../../models/Post')
const showPostUploadView = async (req,res)=>{
    return res.render('post/upload');
}

const createPost = async (req,res,next )=>{
    try{
        const {description , hashtags} = req.body;
        const user = req.user;
        const tags =hashtags.split(",")
        if(!req.file){
            req.flash('error', "Media is required !!");
            res.redirect('/image/post/upload')
        }
        const mediaPathUrl = `posts/${req.file.filename}`
        await createPostValidator.validate({description},{abortEarly : true})
        const post = new postModel({
            media:{
                filename : req.file.filename,
                path : mediaPathUrl,
            },
            description,
            hashtags : tags,
            user : user._Id
        })

        await post.save();
        req.flash('success', "Media uploaded !!");
        res.redirect('/post/upload')
    }
    catch (error){
        next(error)
    }
}
module.exports = {showPostUploadView, createPost}
