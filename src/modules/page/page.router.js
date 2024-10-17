const express = require('express');
const pageController = require('../../modules/page/page.controller')
const auth = require('../../middleware/auth')
const router = express.Router();

router.route('/:pageId').get(auth,pageController.getPage)


module.exports = router;
