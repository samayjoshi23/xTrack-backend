const axios = require("axios");
const { GetUrlAndHeaders } = require('./../utility/axios-urlMaker.js');
const { BaseUrlTypeEnum } = require("./../Models/requestResponseModel");
const OperationalResult = require('./../Models/OperationResult.js');


// Signup function
module.exports.SignUp = async (req, res) => {
  const user = req.body;
  const operationalResult = new OperationalResult();
  const signupReqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.SIGN_UP_BY_PASSWORD, null);
  let userCredentials = { email: user.email, password: user.password };

  try{
    const signupRes = await axios.post(signupReqData.baseUrl, userCredentials, { headers : signupReqData.headers });
    const newUserHeaders = getDefaultHeaders();
    let newUserData = getNewUserData(user, signupRes.data.id);
    let categories = getDefaultCategories(signupRes.data.id);

    const newUserRes = await axios.post("https://grlorbjgloenorxwwfsf.supabase.co/rest/v1/Users", newUserData, { headers : newUserHeaders });
    const newCategoriesRes = await axios.post("https://grlorbjgloenorxwwfsf.supabase.co/rest/v1/Categories", categories, { headers : newUserHeaders });

    operationalResult.data = signupRes.data;
    operationalResult.statusCode = newCategoriesRes.status;
    operationalResult.statusText = newCategoriesRes.statusText;
    res.status(operationalResult.statusCode).json(operationalResult);
  }
  catch (e){
    operationalResult.statusCode = e.response.status;
    operationalResult.statusText = e.response.statusText;
    operationalResult.error = e.response.data.error;
    operationalResult.errorMessage = e.response.data.error_description;
    res.status(operationalResult.statusCode).json(operationalResult);
  }
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

  console.log(reqData);

  axios.post(reqData.baseUrl, {}, { headers : reqData.headers }).then( response => {
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
  const operationalResult = new OperationalResult();
  const reqData = GetUrlAndHeaders(null, BaseUrlTypeEnum.REST_BASE_URL, req.headers.authorization);

  axios.get(`${reqData.baseUrl}Users?select=*`, { headers : reqData.headers }).then( response => {
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

// =================== utility methods =======================
function getDefaultCategories(userId){
  const defaultCategories = [
    {
      uid: '',
      name: 'Lifestyle',
      icon: 'fa-solid fa-shirt',
      isActive: true,
      isDefault: true
    },
    {
      uid: '',
      name: 'Grocery',
      icon: 'fa-solid fa-basket-shopping',
      isActive: true,
      isDefault: true
    },
    {
      uid: '',
      name: 'Bills',
      icon: 'fa-solid fa-credit-card',
      isActive: true,
      isDefault: true
    },
    {
      uid: '',
      name: 'Investment',
      icon: 'fa-solid fa-circle-dollar-to-slot',
      isActive: true,
      isDefault: true
    },
    {
      uid: '',
      name: 'Medical',
      icon: 'fa-solid fa-hand-holding-medical',
      isActive: true,
      isDefault: true
    }
  ];

  defaultCategories.forEach(category => {
    category.uid = userId;
  });

  return defaultCategories;
}

function getNewUserData(user, userId){
  return [{
    appId: `@${user.name.slice(0, 4)}${Math.floor(Math.random() * 10000)}`,
    name: user.name,
    email: user.email,
    id: userId,
    isActive: true
  }];
}

function getDefaultHeaders(){
  return {
    'apikey': process.env.SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
  };
}