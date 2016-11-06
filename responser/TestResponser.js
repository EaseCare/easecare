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
TestResponser.prototype.getTraceTestResponse = function (test_list) {
    logger.info("TestResponser get list service called (getListResponse())"+JSON.stringify(test_list));
    var test_response_array = [];
    var temp_map = {};
    test_list.forEach(function(test){
        if(test.order_item_id in temp_map){
            logger.debug("here");
            var temp = temp_map[test.order_item_id];
            var prev_status_object = temp.test_status;
            var key = test.order_item_status_name;
            var status_object = {
                state: 1,
                date: test.order_item_status_change_date
            };
            prev_status_object[key] = status_object;
            test_response_array.pop();
            test_response_array.push(temp);
        }else{
            var lab_address = {};
            lab_address.line1 = test.address_line_1;
            lab_address.line2 = test.address_line_2;
            lab_address.city = test.city;
            lab_address.state = test.state;
            lab_address.latitude = test.latitude;
            lab_address.longitude = test.longitude;
            var lab_info = {};
            lab_info.id = test.lab_id;
            lab_info.name = test.lab_name;
            lab_info.address =lab_address;
            var test_status = {};
            var key = test.order_item_status_name;
            var status_object = {
                state: 1,
                date: test.order_item_status_change_date
            };
            test_status[key] = status_object;
            var test_response = {};
            test_response.id = test.test_id;
            test_response.name = test.test_name;
            test_response.order_item_id = test.order_item_id
            test_response.appointment_date = test.appointment_date;
            test_response.user_name = test.full_name;
            test_response.user_address = test.order_address;
            test_response.lab_info = lab_info;
            test_response.test_status = test_status;
            test_response_array.push(test_response);
            temp_map[test.order_item_id] = test_response;
        }     
    });
    return test_response_array;
}
module.exports = TestResponser;