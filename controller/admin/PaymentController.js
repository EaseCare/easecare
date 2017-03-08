"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
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

app.get('/paytm/generate_checksum/:id', function(req, res){
    logger.info("Paytm generate checksum request recieved");
    var data = req.data;
    data.id = req.params.id;
    paymentService.generateChecksum(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/paytm/verify_checksum/:id', function(req, res){
    logger.info("Paytm verify checksum request recieved");
    var data = req.data;
    data.id = req.params.id;
    paymentService.verifyChecksum(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});
module.exports = app;