const express = require('express');
const pageController = require('../../modules/page/page.controller')
const router = express.Router();

router.route('/:id').get(pageController.getPage)


module.exports = router;
