"use strict";

var ms = require('ms');

module.exports = {
	
	//TOKEN_EXPIRES_IN : 36000, //36000 (s)

	secret : '8ef0e36b85d9333fc4115ebac6a3f0cc',
	LAB:{
       RANGE_IN_KM : 30
    },
	ERROR_MESSAGE_KEY : "message",

	methodParse : {
		GET : "canRead",
		POST : "canAdd",
		PUT : "canUpdate",
		DELETE : "canDelete"
	},

	orionApiResponseKey : {
		errorMessage : "statusMessage",
		orionAccessToken : "access_token",
		orionExpireTime : "expires_in"
	},

	/*************************** Token Properties *************************/

  token: function () {
    return {
      "iss": "Orion",
      "aud": "http://session.orion",
	  "ignoreExpiration": true
      //"exp": Date.now() / 1000 + ms("10h") / 1000
    };
  }
};
