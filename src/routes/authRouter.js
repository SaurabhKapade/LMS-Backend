const express = require('express');
const { loginUser, logOut } = require('../controllers/authController');
const { isLoggedIn } = require('../Validation/authValidator');
const authRouter = express.Router();
authRouter.post('/login',loginUser);
authRouter.post('/logout',logOut)
module.exports = authRouter