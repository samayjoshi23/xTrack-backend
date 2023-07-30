const express = require('express');
const router = express.Router();

// Controllers
const { homeData } = require('../Controllers/transactionController');
const wrapAsync = require('../utility/wrapAsync');

router.get('/homeData', wrapAsync(homeData));


module.exports = router;