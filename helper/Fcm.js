/**
 * Created by Karambeer singh randhawa on 02/08/2016.
 */
var FCM = require('fcm-node');

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var constants = config.constants;


var SERVER_API_KEY='AIzaSyDqElQi-j6Q3uTu0zFbR5bnBKv1_GEp8XM';//put your api key here

var validDeviceRegistrationToken = 'dN8lBg4NvK4:APA91bG15HYg33MXVCdMp2a3tZ5yarPIu_EbtHGVtthJZIlDnoD3g8eHzQq1hgU3iqQ-63P8jED5U6h7pfJpcx1SGjBhd-pPI6_MHgIHUK3grJrTCRV75u7u20Ir-bjnBt-MAq5h7OcB'; //put a valid device token here




var fcmCli= new FCM(SERVER_API_KEY);

var payloadOK = {
    to: validDeviceRegistrationToken,
    data: { //some data object (optional)
        url: 'news',
        foo:'fooooooooooooo',
        bar:'bar bar bar'
    },
    priority: 'high',
    content_available: true,
    notification: { //notification object
        title: 'HELLO', body: 'World!', sound : "default", badge: "1"
    }
};

var payloadError = {
    to: "4564654654654654", //invalid registration token
    data: {
        url: "news"
    },
    priority: 'high',
    content_available: true,
    notification: { title: 'TEST HELLO', body: '123', sound : "default", badge: "1" }
};

var payloadMulticast = {
    registration_ids:["4564654654654654",
        '123123123',
        validDeviceRegistrationToken, //valid token among invalid tokens to see the error and ok response
        '123133213123123'],
    data: {
        url: "news"
    },
    priority: 'high',
    content_available: true,
    notification: { title: 'Hello', body: 'Multicast', sound : "default", badge: "1" }
};

var callbackLog = function (sender, err, res) {
    console.log("\n__________________________________")
    console.log("\t"+sender);
    console.log("----------------------------------")
    console.log("err="+err);
    console.log("res="+res);
    console.log("----------------------------------\n>>>");
};

function sendOK()
{
    fcmCli.send(payloadOK,function(err,res){
        callbackLog('sendOK',err,res);
    });
}

function sendError() {
    fcmCli.send(payloadError,function(err,res){
        callbackLog('sendError',err,res);
    });
}

function sendMulticast(){
    fcmCli.send(payloadMulticast,function(err,res){
        callbackLog('sendMulticast',err,res);
    });
}


sendOK();
sendMulticast();
sendError();
