const express = require('express');
const postController = require('../post/post.controller');
const auth = require('../../middleware/auth')
const router = express.Router();
const {multerStorage} = require('../../middleware/uploaderConfig')

const upload = multerStorage('public/image/posts',/jpeg|jpg|png|webp|mp4|mkv/)

router.route("/").get(auth,postController.showPostUploadView).post(auth, upload.single('media'),postController.createPost)
module.exports = router;