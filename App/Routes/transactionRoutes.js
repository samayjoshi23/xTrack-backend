const express = require('express');
const router = express.Router();

// Controllers
const { GetTransactions, GetCategories } = require('../Controllers/transactionController');
const wrapAsync = require('../utility/wrapAsync');

router.get('/getTransactions', wrapAsync(GetTransactions));

router.get('/getCategories', wrapAsync(GetCategories));


module.exports = router;