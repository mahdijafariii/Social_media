const express = require('express');
const postController = require('../post/post.controller');
const auth = require('../../middleware/auth')
const router = express.Router();
const {multerStorage} = require('../../middleware/uploaderConfig')

const upload = multerStorage('public/image/posts',/jpeg|jpg|png|webp|mp4|mkv/)

router.route("/").get(auth,postController.showPostUploadView).post(auth, upload.single('media'),postController.createPost)

router.route('/like').post(auth,postController.like);
router.route('/dislike').post(auth,postController.dislike);

router.route("/save").post(auth, postController.save);
router.route("/unsave").post(auth, postController.unsave);

router.route("/saves").get(auth, postController.showSavesView);
router.route("/:postID/remove").get(auth, postController.removePost);
router.route("/new-comment").post(auth, postController.addComment);

module.exports = router;