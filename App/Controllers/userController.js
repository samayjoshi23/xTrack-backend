const axios = require("axios");
const { GetUrlAndHeaders } = require('./../utility/axios-urlMaker.js');
const { BaseUrlTypeEnum } = require("./../Models/requestResponseModel");
const OperationalResult = require('./../Models/OperationResult.js');
const RequestParams = require('./../Models/RequestParams.js');

// Signup function
module.exports.SignUp = async (req, res) => {
  const { email, password } = req.body;
  const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.SIGN_UP_BY_PASSWORD, null);
  const operationalResult = new OperationalResult();

  axios.post(reqData.baseUrl, { email, password }, { headers : reqData.headers }).then( response => {
    operationalResult.data = response.data;
    operationalResult.statusCode = response.status;
    operationalResult.statusText = response.statusText;
    res.status(operationalResult.statusCode).json(operationalResult);
  })
  .catch( e => {
    operationalResult.statusCode = e.response.status;
    operationalResult.statusText = e.response.statusText;
    operationalResult.error = e.response.data.error;
    operationalResult.errorMessage = e.response.data.error_description;
    res.status(operationalResult.statusCode).json(operationalResult);
  });
};


// Login function
module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.LOGIN_BY_PASSWORD, null);
  const operationalResult = new OperationalResult();
  
  axios.post(reqData.baseUrl, { email, password }, { headers : reqData.headers }).then( response => {
    operationalResult.data = response.data;
    operationalResult.statusCode = response.status;
    operationalResult.statusText = response.statusText;
    res.status(operationalResult.statusCode).json(operationalResult);
  })
  .catch( e => {
    operationalResult.statusCode = e.response.status;
    operationalResult.statusText = e.response.statusText;
    operationalResult.error = e.response.data.error;
    operationalResult.errorMessage = e.response.data.error_description;
    res.status(operationalResult.statusCode).json(operationalResult);
  });
};


// Logout function
module.exports.SignOut = async (req, res) => {
  const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.LOGOUT, req.headers.authorization);
  const operationalResult = new OperationalResult();

  axios.post(reqData.baseUrl, { headers : reqData.headers }).then( response => {
    operationalResult.data = response.data;
    operationalResult.statusCode = response.status;
    operationalResult.statusText = response.statusText;
    res.status(operationalResult.statusCode).json(operationalResult);
  })
  .catch( e => {
    operationalResult.statusCode = e.response.status;
    operationalResult.statusText = e.response.statusText;
    operationalResult.error = e.response.data.error;
    operationalResult.errorMessage = e.response.data.error_description;
    res.status(operationalResult.statusCode).json(operationalResult);
  });
};


//Get User data
module.exports.GetUserData = async (req, res) => {
  const reqParams = new RequestParams();
  const operationalResult = new OperationalResult();

  console.log(req.query);
  reqParams = req.query;
  const reqData = GetUrlAndHeaders(reqParams, BaseUrlTypeEnum.REST_BASE_URL, req.headers.authorization);

  console.log(reqData);

  axios.get((reqData.baseUrl + reqData.finalQueryString), { headers : reqData.headers }).then( response => {
    operationalResult.data = response.data;
    operationalResult.statusCode = response.status;
    operationalResult.statusText = response.statusText;
    res.status(operationalResult.statusCode).json(operationalResult);
  })
  .catch( e => {
    operationalResult.statusCode = e.response.status;
    operationalResult.statusText = e.response.statusText;
    operationalResult.error = e.response.data.error;
    operationalResult.errorMessage = e.response.data.error_description;
    res.status(operationalResult.statusCode).json(operationalResult);
  });
};