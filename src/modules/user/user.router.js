const express = require("express");
const controller = require("./user.controller");
const auth = require("../../middleware/auth");
const { multerStorage } = require("./../../middleware/uploaderConfig");
const router = new express.Router();
const upload = multerStorage("public/images/profiles");

// Route
router.route("/edit-profile").get(auth, controller.showPageEditView);
router
    .route("/profile-picture")
    .post(auth, upload.single("profile"), controller.updateProfile);
module.exports = router;
