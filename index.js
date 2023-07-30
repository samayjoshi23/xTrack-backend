require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require('./App/utility/errorHandler');

// --------------- Use Utils- -------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(errorHandler);




// -------------- App Routes --------------------
app.use('/api/user', require('./App/Routes/userRoutes'));
app.use('/api/transaction', require('./App/Routes/transactionRoutes'));
app.use('/api/payment', require('./App/Routes/paymentRoutes'));






// ---------------- Server Start ----------------
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});