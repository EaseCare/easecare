"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var paytm_config = require('paytm/paytm_config').paytm_config;
var paytm_checksum = require('paytm/checksum');
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var PaymentService = require('service/admin/PaymentService.js');
var paymentService = new PaymentService();


app.get('/', function (req, res) {
    logger.info("Get Payment list request received");
    paymentService.getList(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/', function (req, res) {
    logger.info("Create order Payment request received");
    paymentService.createOrderPayment(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/orders', function (req, res) {
    logger.info("Get Order Payment list request received");
    paymentService.getOrdersPayment(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/paytm/generate_checksum', function(req, res){
    logger.info("Paytm generate checksum request recieved");
    paytm_checksum.genchecksum(req.data, paytm_config.MERCHANT_KEY, function (err, data) {
        if(err){
            return response("Something wrong",500,null,res);
        }else{
            var finalResponse = {};
            finalResponse.CHECKSUMHASH = data.CHECKSUMHASH;
        }
        return response(err, 200, finalResponse, res);
    });
});

app.post('/paytm/verify_checksum', function(req, res){
    logger.info("Paytm verify checksum request recieved");
    var decodedBody = req.data;
    var isCheckSumValid = false;
    if(paytm_checksum.verifychecksum(decodedBody, paytm_config.MERCHANT_KEY)) {
        isCheckSumValid = true;
    }
    /*if(decodedBody.CHECKSUMHASH){
        delete decodedBody.CHECKSUMHASH;
    }*/
    var returnData = {
        isCheckSumValid : isCheckSumValid
    }
     return response(null, 200, returnData, res)
});
module.exports = app;