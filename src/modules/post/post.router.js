const express = require('express');
const postController = require('../post/post.controller');
const router = express.Router();

router.route("/").get(postController.showPostUploadView).post(postController.createPost)
module.exports = router;