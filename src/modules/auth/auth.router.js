const express = require('express');
const userController = require('../../modules/auth/auth.controller');
const router = express.Router();


router.route('/register').get(userController.showRegisterView).post(userController.register);

module.exports = router;
