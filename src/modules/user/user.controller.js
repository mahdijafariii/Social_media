const UserModel = require("./../../models/User");

exports.showPageEditView = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user._id });
    return res.render("user/edit.ejs", {
        user,
    });
};
exports.showPageEditView = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user._id });
    return res.render("user/edit.ejs", {
        user,
    });
};

exports.updateProfile = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const { name, username, email } = req.body;

        // Handler file upload
        if (!req.file) {
            req.flash("error", "Please upload a profile picture");
            return res.redirect("/users/edit-profile");
        }

        const { filename } = req.file;

        const profilePath = `images/profiles/${filename}`;

        const user = await UserModel.findOneAndUpdate(
            { _id: userID },
            { profilePicture: profilePath },
            { new: true } // Return updated user document
        );

        if (!user) {
            // Codes
        }

        req.flash("success", "Profile picture updated successfully");
        return res.redirect("/users/edit-profile");
    } catch (err) {
        next(err);
    }
};