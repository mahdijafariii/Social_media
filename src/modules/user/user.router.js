const express = require("express");
const controller = require("./user.controller");
const auth = require("../../middlewares/auth");

const router = new express.Router();

// Route
router.route("/edit-profile").get(auth, controller.showPageEditView);

module.exports = router;
