"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var ShoppingCartService = require('service/admin/ShoppingCartService.js');
var shoppingCartService = new ShoppingCartService();


app.get('/', function (req, res) {
    logger.info("Get ShoppingCart list request received");
    shoppingCartService.getList(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/', function (req, res) {
    logger.info("Post ShoppingCart list request received");
    shoppingCartService.add(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.put('/',function (req, res){
    logger.info("Update ShoppingCart list request received");
    var data = req.data;
    shoppingCartService.updateCartTestLabs(data, function (err, status, data) {
        return response(err, status, data, res);
    });
})
app.delete('/', function(req, res) {
    logger.info("Delete ShoppingCart Item request received");
    shoppingCartService.removeUserCartItem(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

module.exports = app;