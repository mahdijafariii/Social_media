const {createPostValidator} = require("./post.validator");
const postModel = require('../../models/Post')
const showPostUploadView = async (req,res)=>{
    return res.render('post/upload');
}

const createPost = async (req,res,next)=>{
    try{
        const {description , hashtags} = req.body;
        console.log(req.body)
        const user = req.user;
        const tags = hashtags.split(",")
        if(!req.file){
            req.flash('error', "Media is required !!");
            return res.redirect('/image/post/upload')
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
            user : user._id
        })
        await post.save();
        req.flash('success', "Media uploaded !!");
        return res.redirect('/post/upload')
    }
    catch (error){
        next(error)
    }
}

const like = async (req,res,next)=>{
    try {
        const user = req.user;
        const { postID } = req.body;

        const post = await PostModel.findOne({ _id: postID });
        if (!post) {
            //! Error Message
        }

        const hasAccess = await hasAccessToPage(user._id, post.user.toString());
        if (!hasAccess) {
            //! Error Message
        }

        const existingLike = await LikeModel.findOne({
            user: user._id,
            post: postID,
        });

        if (existingLike) {
            return res.redirect("back"); // /page/:pageID ...
        }

        const like = new LikeModel({
            post: postID,
            user: user._id,
        });

        like.save();

        return res.redirect("back");
    } catch (err) {
        next(err);
    }
}

const dislike = async (req,res,next)=>{
    try {

    }
    catch (error){
        next(error)
    }
}

module.exports = {showPostUploadView, createPost}
