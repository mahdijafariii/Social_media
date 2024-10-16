const express = require('express');
const userController = require('../../modules/auth/auth.controller');
const router = express.Router();


router.route('/register').get(userController.showRegisterView).post(userController.register);


router.route('/login').get(userController.showLoginView).post(userController.login);

module.exports = router;
