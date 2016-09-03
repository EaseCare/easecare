"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;

var TestResponser = function () { };

TestResponser.prototype.getListResponse = function (lab_list) {
    logger.info("TestResponser get list service called (getListResponse())");
    var self = this;
    var listResponse = [];
    var emptyString = "";
    var defaultNumber = 0;
    lab_list.forEach(function (lab) {
        var address = {};
        address.line1 = lab.address_line_1||emptyString;
        address.line2 = lab.address_line_2||emptyString;
        address.city = lab.city||emptyString;
        address.state = lab.state||emptyString;
        address.latitude = lab.latitude||defaultNumber;
        address.longitude = lab.longitude||defaultNumber;
        var review = {};
        review.text = lab.review||emptyString;
        review.created_date = lab.created_date||emptyString;
        review.user_id = lab.user_id||defaultNumber;
        review.first_name = lab.first_name||emptyString;
        review.last_name = lab.last_name||emptyString;
        review.user_image = lab.user_image||emptyString;
        var labResponse = {};
        labResponse.id = lab.id;
        labResponse.name = lab.name||emptyString;
        labResponse.lab_image = lab.lab_image||emptyString;
        labResponse.test_name = lab.test_name||emptyString;
        labResponse.price = lab.price||defaultNumber;
        labResponse.average_rating = lab.average_rating||defaultNumber;
        labResponse.top_review = review||defaultNumber;
        labResponse.address = address;
        listResponse.push(labResponse);
    });
    return listResponse;
}

module.exports = TestResponser;