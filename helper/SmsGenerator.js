"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName)

var twilio = require('twilio');
// Find your account sid and auth token in your Twilio account Console.
var TWILIO_ACCOUNT_SID = 'AC6c1425d420d03e0205514da38125bf42';
var TWILIO_AUTH_TOKEN = '337cda957d0b7ac627244cba1fe9db12';
var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Send the text message.
module.exports.sendMessage = function(sender_mobile_no, correlationId){
    client.sendMessage({
      to: sender_mobile_no || '+918054782350',
      from: '+13343842009',
      body: 'Your One Time OTP is '+correlationId
    }, function(err, message) {
        if(err){
            logger.error("Error sending message "+err);
        }
        logger.info("Message send successfully  "+message);
    });
}
