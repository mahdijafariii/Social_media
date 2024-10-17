const UserModel = require("./../../models/User");

exports.showPageEditView = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user._id });
    return res.render("user/edit.ejs", {
        user,
    });
};
