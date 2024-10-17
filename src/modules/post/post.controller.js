const {createPostValidator} = require("./post.validator");
const postModel = require('../../models/Post')
const SaveModel = require('../../models/Save')
const LikeModel = require('../../models/Like')
const CommentModel = require('../../models/Comment')
const hasAccessToPage = require('../../utils/hasAccessToPage');
const {getUserInfo} = require("../../utils/helper");
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
        const user = req.user;
        const { postID } = req.body;

        const like = await LikeModel.findOne({ user: user._id, post: postID });

        if (!like) {
            return res.redirect("back");
        }

        // await LikeModel.findOneAndDelete({ user: user._id, post: postID });
        await LikeModel.findOneAndDelete({ _id: like._id });

        return res.redirect("back");
    } catch (err) {
        next(err);
    }
}

const save = async (req, res, next) => {
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

        const existingSave = await SaveModel.findOne({
            user: user._id,
            post: postID,
        });

        if (existingSave) {
            return res.redirect("back"); // /page/:pageID ...
        }

        await SaveModel.create({ post: postID, user: user._id });

        return res.redirect("back");
    } catch (err) {
        next(err);
    }
};

const unsave = async (req, res, next) => {
    try {
        const user = req.user;
        const { postID } = req.body;

        const removedSave = await SaveModel.findOneAndDelete({
            user: user._id,
            post: postID,
        });

        if (!removedSave) {
            //! Error Message
        }

        return res.redirect("back");
    } catch (err) {
        next(err);
    }
};
const showSavesView = async (req, res, next) => {
    try {
        const user = req.user;
        const saves = await SaveModel.find({ user: user._id })
            .populate({
            path: "post",
            populate: {
                path: "user",
                model: "User",
            },
        }).lean();

        const likes = await LikeModel.find({ user: user._id })
            .populate("post")
            .lean();

        saves.forEach((item) => {
            likes.forEach((like) => {
                if (item.post._id.toString() === like.post._id.toString()) {
                    item.post.hasLike = true;
                }
            });
        });

        const userInfo = await getUserInfo(user._id);
        return res.render("post/saves", {
            posts: saves,
            user : userInfo
        });
    } catch (err) {
        next(err);
    }
}

const removePost = async (req,res,next)=>{
    try {
        const user = req.user;
        const { postID } = req.params;

        const post = await PostModel.findOne({ _id: postID });

        if (!post || post.user.toString() !== user._id.toString()) {
            req.flash("error", "You cant remove this post !!");
            return res.redirect("back");
        }

        const mediaPath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "public",
            "images",
            "posts",
            post.media.filename
        );

        fs.unlinkSync(mediaPath, (err) => {
            if (err) {
                next(err);
            }
        });

        await LikeModel.deleteMany({ post: postID });
        await SaveModel.deleteMany({ post: postID });
        // await CommentModel.deleteMany({ post: postID });

        await PostModel.findByIdAndDelete(postID);

        req.flash("success", "Post removed successfully :))");
        return res.redirect("back");
    } catch (err) {
        next(err);
    }
}
const addComment = async (req, res, next) => {
    try {
        const user = req.user;
        const { content, postID } = req.body;

        // if (!user.isVerified) {
        //   req.flash("error", "First Login for submit comment");
        //   return res.redirect("back");
        // }

        const post = await PostModel.findOne({ _id: postID });
        if (!post) {
            // Codes
        }

        // ParentID

        const comment = new CommentModel({ content, post: postID, user: user._id });
        comment.save();

        req.flash("success", "Comment submitted successfully :))");
        return res.redirect("back");
    } catch (err) {
        next(err);
    }
};

module.exports = {showPostUploadView, createPost, like , dislike,save , unsave,showSavesView,removePost ,addComment};
