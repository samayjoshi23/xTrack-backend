const express = require('express');
const router = express.Router();

// Controllers
const { validatePayment, createPaymentOrder } = require('../Controllers/paymentController');
const wrapAsync = require('../utility/wrapAsync');

// When multiple calls on same route

// router.route('/login')
//  .get(isUser, wrapAsync(users.loginPage))
//  .post([
//      body('email','Enter a valid Email').exists().isEmail(),
//      body('password','Password should be between 5 to 15 characters').isLength({min:5, max:15}).exists()
//  ], wrapAsync(users.loginData))


router.post('/createPaymentOrder', wrapAsync(createPaymentOrder));

router.post('/validatePayment', wrapAsync(validatePayment));



module.exports = router;