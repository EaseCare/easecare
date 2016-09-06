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
    lab_list.forEach(function (lab) {
        var address = {};
        address.line1 = lab.address_line_1;
        address.line2 = lab.address_line_2;
        address.city = lab.city;
        address.state = lab.state;
        address.latitude = lab.latitude;
        address.longitude = lab.longitude;
        var review = {};
        review.text = lab.review;
        review.created_date = lab.created_date;
        review.user_id = lab.user_id;
        review.first_name = lab.first_name;
        review.last_name = lab.last_name;
        review.user_image = lab.user_image;
        var labResponse = {};
        labResponse.id = lab.id;
        labResponse.name = lab.name;
        labResponse.lab_image = lab.lab_image;
        labResponse.test_name = lab.test_name;
        labResponse.price = lab.price;
        labResponse.average_rating = lab.average_rating;
        labResponse.top_review = review;
        labResponse.address = address;
        listResponse.push(labResponse);
    });
    return listResponse;
}

module.exports = TestResponser;