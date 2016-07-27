"use strict";

var ms = require('ms');

module.exports = {
	
	TOKEN_EXPIRES_IN : 36000, //36000 (s)

	secret : '8ef0e36b85d9333fc4115ebac6a3f0cc',

	ERROR_MESSAGE_KEY : "message",

	methodParse : {
		GET : "canRead",
		POST : "canAdd",
		PUT : "canUpdate",
		DELETE : "canDelete"
	},

	api : {
		logIn : 'https://testapi.orionadvisor.com/api/v1/security/token',
		userDetail : 'https://testapi.orionadvisor.com/api/v1/Authorization/User',
		searchOrionUser : 'https://testapi.orionadvisor.com/api/v1//Security/Profiles/Search'
	},

	orionApiResponseKey : {
		errorMessage : "statusMessage",
		orionAccessToken : "access_token",
		orionExpireTime : "expires_in"
	},

	/** Preference Constants  **/

	record : {
		FIRM : "Firm",
		CUSTODIAN : "Custodian",
		TEAM : "Team",
		PORTFOLIO : "Portfolio",
		MODEL : "Model",
		ACCOUNT : "Account",
		SECURITY : "Security",
		HOLDING : "Holding",
		USER : "User"
	},
	
	recordBitValue : {
		FIRM : 1,
		CUSTODIAN : 2,
		TEAM : 4,
		PORTFOLIO : 8,
		MODEL : 16,
		ACCOUNT : 32,
		SECURITY : 64,
		HOLDING : 128,
		USER : 256
	},

	preferenceTradeFilter : {
		TRADE_MIN : "Trade Min",
		TRADE_MAC : "Trade Min",
	},

	prefrenceValueType : {
		OPTION_LIST : "OptionList"
	},

	// api: {
	// logIn: 'http://localhost:3000/connect/getToken/',
	// userDetail: 'http://localhost:3000/connect/getUser/',
	// searchOrionUser:
	// 'https://testapi.orionadvisor.com/api/v1//Security/Profiles/Search'
	// },

	/**
	 * ************************** Orion Connect Token
	 * Properties************************
	 */

  token: function () {
    return {
      "iss": "Orion",
      "aud": "http://session.orion",
      "exp": Date.now() / 1000 + ms("10h") / 1000
    };
  }
};
