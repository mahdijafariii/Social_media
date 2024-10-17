const hasAccessToPage = require('../../utils/hasAccessToPage')
const FollowModel = require('../../models/Follow')
const UserModel = require('../../models/User');
const PostModel = require('../../models/Post')
const LikeModel = require('../../models/Like');
const getPage = async (req,res,next) =>{
    try {
        const user = req.user;
        const { pageID } = req.params;
        const hasAccess = await hasAccessToPage(user._id, pageID);

        const followed = await FollowModel.findOne({
            follower: user._id,
            following: pageID,
        });

        const page = await UserModel.findOne(
            { _id: pageID },
            "name username biography isVerified"
        ).lean();

        if (!hasAccess) {
            req.flash("error", "Follow page to show content");
            return res.render("page/index", {
                followed: Boolean(followed),
                pageID,
                followers: [],
                followings: [],
                hasAccess: false,
                page,
                posts: [],
            });
        }

        let followers = await FollowModel.find({ following: pageID }).populate(
            "follower",
            "name username"
        );

        followers = followers.map((item) => item.follower);

        let followings = await FollowModel.find({ follower: pageID }).populate(
            "following",
            "name username"
        );

        followings = followings.map((item) => item.following);

        const posts = await PostModel.find({ user: pageID })
            .sort({ _id: -1 })
            .populate("user", "name username");
        const own = user._id.toString() === pageID;

        const likes = await LikeModel.find({ user: user._id })
            .populate("user", "_id")
            .populate("post", "_id");

        let postsWithLikes = [];

        posts.forEach((post) => {
            if (likes.length) {
                likes.forEach((like) => {
                    if (like.post._id.toString() === post._id.toString()) {
                        postsWithLikes.push({ ...post, hasLike: true });
                    } else {
                        postsWithLikes.push({ ...post });
                    }
                });
            } else {
                postsWithLikes = [...posts];
            }
        });
        return res.render("page/index", {
            followed: Boolean(followed),
            pageID,
            hasAccess: true,
            followers,
            followings,
            page,
            own,
            posts : postsWithLikes,
        });
    } catch (err) {
        next(err);
    }
}

const follow = async (req,res,next)=>{
    try {
        const user = req.user;
        const { pageID } = req.params;

        const targetOwnPage = await UserModel.findOne({ _id: pageID });
        if (!targetOwnPage) {
            req.flash("error", "Page not found to follow !!");
            return res.redirect(`/pages/${pageID}`);
        }

        if (user._id.toString() === pageID) {
            req.flash("error", "You cannot follow yourself");
            return res.redirect(`/pages/${pageID}`);
        }

        const existingFollow = await FollowModel.findOne({
            follower: user._id,
            following: pageID,
        });

        if (existingFollow) {
            req.flash("error", "Page already followed !!");
            return res.redirect(`/pages/${pageID}`);
        }

        await FollowModel.create({
            follower: user._id,
            following: pageID,
        });

        req.flash("success", "Page followed successfully :))");
        return res.redirect(`/pages/${pageID}`);
    } catch (err) {
        next(err);
    }
}

const unfollow = async (req,res,next)=>{
    try {
        const user = req.user;
        const { pageID } = req.params;

        const unFollowedPage = await FollowModel.findOneAndDelete({
            follower: user._id,
            following: pageID,
        });

        if (!unFollowedPage) {
            req.flash("error", "You didn't follow this page !!");
            return res.redirect(`/pages/${pageID}`);
        }

        req.flash("success", "Page unFollowed successfully :))");
        return res.redirect(`/pages/${pageID}`);
    } catch (err) {
        next(err);
    }
}

module.exports = {getPage,follow,unfollow}