const axios = require("axios");
const { GetUrlAndHeaders } = require('./../utility/axios-urlMaker.js');
const { BaseUrlTypeEnum } = require("./../Models/requestResponseModel");
const OperationalResult = require('./../Models/OperationResult.js');


//Get user transactions
module.exports.GetTransactions = async (req, res) => {
    const operationalResult = new OperationalResult();
    thisMonthFilterString = req.query.filterString;
    const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.REST_BASE_URL, req.headers.authorization);
    let tableFields = 'id,title,description,amount,transactionType,mode,dateCreated';
    let filters = `&isActive=eq.1${thisMonthFilterString}`;
  
    axios.get(`${reqData.baseUrl}Transactions?select=${tableFields},category:Categories(id, name, icon)${filters}`, { headers : reqData.headers }).then( response => {
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


//Get user categories
module.exports.GetCategories = async (req, res) => {
    const operationalResult = new OperationalResult();
    const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.REST_BASE_URL, req.headers.authorization);
  
    axios.get(`${reqData.baseUrl}Categories?select=id,name,icon,isDefault&isActive=eq.1`, { headers : reqData.headers }).then( response => {
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