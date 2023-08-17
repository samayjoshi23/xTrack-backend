const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const { BaseUrlTypeEnum } = require("./../Models/requestResponseModel");

const UrlSet = (type) => {
  switch(type){
    case BaseUrlTypeEnum.SIGN_UP_BY_PASSWORD : return `${supabaseUrl}/auth/v1/signup`;
    case BaseUrlTypeEnum.SIGN_UP_BY_PHONE : return `${supabaseUrl}/auth/v1/signup`;
    case BaseUrlTypeEnum.LOGIN_BY_PASSWORD : return `${supabaseUrl}/auth/v1/token?grant_type=password`;
    case BaseUrlTypeEnum.LOGIN_BY_PHONE : return `${supabaseUrl}/auth/v1/otp`;
    case BaseUrlTypeEnum.OTP_VARIFICATION : return `${supabaseUrl}/auth/v1/verify`;
    case BaseUrlTypeEnum.RECOVER_PASSWORD : return `${supabaseUrl}/auth/v1/recover`;
    case BaseUrlTypeEnum.LOGOUT : return `${supabaseUrl}/auth/v1/logout`;
    case BaseUrlTypeEnum.REST_BASE_URL : return `${supabaseUrl}/rest/v1/`;
  }
};

const GetHeaders = (authToken = null, recordRange = null) => {
  let headers = {
    'apikey': supabaseKey,
    'Content-Type': 'application/json'
  };
  if(authToken != null){
    headers.Authorization = authToken;
  }
  if(recordRange != null){
      headers['Range']= recordRange;
  }

  return headers;
}

module.exports.GetUrlAndHeaders = (range, operationType, authToken = null) => {
  let headers = '';
  let baseUrl = '';
  
  headers = GetHeaders(authToken, range);
  baseUrl = UrlSet(operationType);

  return { headers, baseUrl };
}



// let requestParams = {
//   table: "Users",
//   alias: "",
//   getAll: true,
//   joinWithTable: [
//     {
//       tableName: "categories",
//       alias: "category",
//       columns: ["name", "iconClass"],
//       filters: {
//         isActive: "eq.true",
//       },
//     },
//     {
//       tableName: "notifications",
//       alias: "notification",
//       columns: ["message", "duration"],
//       filters: {
//         duration: "eq.due",
//       },
//     },
//   ],
//   columns: ["Name", "appId", "userId"],
//   range: "0-9",
//   filters: {
//     id: "eq.userId",
//     amount: "gte.500",
//   },
// }