const hasAccessToPage = require('../../utils/hasAccessToPage')
const followModel = require('../../models/Follow')
const userModel = require('../../models/User');
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

        console.log(page);

        if (!hasAccess) {
            req.flash("error", "Follow page to show content");
            return res.render("page/index", {
                followed: Boolean(followed),
                pageID,
                followers: [],
                followings: [],
                hasAccess: false,
                page,
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

        return res.render("page/index", {
            followed: Boolean(followed),
            pageID,
            hasAccess: true,
            followers,
            followings,
            page,
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