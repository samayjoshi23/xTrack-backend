const express = require('express');
const router = express.Router();

// Controllers
const { SignUp, Login, GetUserData, SignOut } = require('../Controllers/userController.js');
const wrapAsync = require('../utility/wrapAsync.js');

router.post('/login', wrapAsync(Login));

router.post('/signup', wrapAsync(SignUp));

router.post('/signout', wrapAsync(SignOut));

router.get('/getuser', wrapAsync(GetUserData));


module.exports = router;