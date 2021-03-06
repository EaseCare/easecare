"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var TestService = require('service/admin/TestService.js');
var testService = new TestService();


app.get('/', function (req, res) {
    logger.info("Get Test list request received");
    var data = req.data;
    data.category_id = req.query.category_id;
    testService.getList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id/subtest', function (req, res) {
    logger.info("Get Test list request received");
    var data = req.data;
    data.id = req.params.id;
    testService.getSubList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id/labs', function (req, res) {
    logger.info("Get Test labs request received");
     var data = req.data;
     data.id = req.params.id;
     data.latitude = req.query.latitude;
     data.longitude = req.query.longitude;
    testService.getTestLabs(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/trace', function (req,res) {
    logger.info("Get Test labs list request received");
    var data = req.data;
    data.status_id = req.query.status_id;
    testService.getTraceTestList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/trace/:id', function (req,res) {
    logger.info("Get Test labs request received");
    var data = req.data;
    var host = req.headers.host;
    data.order_item_id = req.params.id;
    testService.getTraceTest(data, function (err, status, result) {
        var serverPath = req.headers.host;
        if(result && result.lenth>0 && result.reportPath){
            result.reportPath = serverPath+result.reportPath;
        }
        return response(err, status, result, res);
    });
});


module.exports = app;