"use strict";

var moduleName = __filename;
var config = require('config');
var constants = config.constants;
var logger = require('helper/Logger.js')(moduleName);
var messages = config.messages;

var responseCode = config.responseCode;
var responseToHttpResponseMapper = require('helper/ResponseToHttpResponseCodeMapper.js');

module.exports = function (err, status, data, res) {
		
        if(( status !== responseCode.SUCCESS) && !!err ){
        	var finalMessage = null;
            if( status === responseCode.INTERNAL_SERVER_ERROR ) {
            	if(!!err.message || !!err.Message){
					finalMessage = !!err.message ? err.message : err.Message;
            		data = JSON.parse("{\""+constants.ERROR_MESSAGE_KEY+"\":\""+ finalMessage + "\"}");
            	}else{
            		data = JSON.parse("{\""+constants.ERROR_MESSAGE_KEY+"\":\""+err+"\"}");
            	}
            }
            else {
            	if(!!err.Message){
            		finalMessage = !!err.Message ? err.Message : err;
            		data = JSON.parse('{ "' + constants.ERROR_MESSAGE_KEY + '":"' + finalMessage + '" }');
            	}else{
            		data = JSON.parse("{\""+constants.ERROR_MESSAGE_KEY+"\":\""+ err +"\"}");
            	}
            }
        }
		if(!!status){
        	res.status(responseToHttpResponseMapper(status));
		}

        res.json(data);
        return res.end();
};
