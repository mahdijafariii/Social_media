const express = require('express');
const postController = require('../post/post.controller');
const auth = require('../../middleware/auth')
const router = express.Router();

router.route("/").get(auth,postController.showPostUploadView).post(auth,postController.createPost)
module.exports = router;