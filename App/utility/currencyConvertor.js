const currencyConvertor = {
  rupeesToPaise: function (rupees) {
    return rupees * 100;
  },
  paiseToRupees: function (paise) {
    return paise / 100;
  },
};

module.exports = currencyConvertor;
