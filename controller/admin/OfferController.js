"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var OfferService = require('service/admin/OfferService.js');
var offerService = new OfferService();


app.get('/', function (req, res) {
    logger.info("Get Offer list request received");
    var data = req.data;
    offerService.getList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/apply', function (req, res) {
    logger.info("Apply Coupon request received");
    var data = req.data;
    offerService.applyCoupon(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

module.exports = app;