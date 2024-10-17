const express = require('express');
const pageController = require('../../modules/page/page.controller')
const auth = require('../../middleware/auth')
const router = express.Router();

router.route('/:pageId').get(auth,pageController.getPage)
router.route('/:pageId/follow').post(auth,pageController.follow)
router.route('/:pageId/unfollow').post(auth,pageController.unfollow)


module.exports = router;
