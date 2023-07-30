const Razorpay = require('razorpay');
const currencyConvertor = require("../utility/currencyConvertor");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
  
module.exports.createPaymentOrder = async(req, res) => {
    let amount = currencyConvertor.rupeesToPaise(req.body.payload.amount);
    let options = {
      amount: amount, // amount in the smallest currency unit here paise
      currency: "INR",
      receipt: req.body.payload.recieptId,
      notes: {
        refund: "No refund will be availavble after deduction of money"
      },
    };

    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        res.status(500);
        let response = { status: 500, data: err };
        res.send(response);
      }
      else if (order) {
        console.log('Response', order);
        res.status(200);
        let response = { status: 200, data: order };
        res.send(response);
      }
    });
}

module.exports.validatePayment = async(req, res) => {
    const razorpay_signature = req.body.payload.razorpay_signature;
    const secret = instance.key_secret;
    const order_id = req.body.payload.original_order_id;
    const razorpay_payment_id = req.body.payload.razorpay_payment_id;
    let { validatePaymentVerification } = require("../../node_modules/razorpay/dist/utils/razorpay-utils");

    const isPaymentVerfied = validatePaymentVerification(
    { order_id: order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    secret
    );
    isPaymentVerfied ? res.status(200) : res.status(500);
    res.send({ data: { isPaymentVerfied: isPaymentVerfied } });
}