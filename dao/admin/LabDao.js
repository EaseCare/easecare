"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var LabDao = function () { }

LabDao.prototype.getList = function (data, cb) {
    logger.debug("lab get list method call start (getList())");
    var query = [];
    query.push(" SELECT l.id,l.name ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,i.path ");
    query.push(" FROM lab as l ");
    query.push(" LEFT OUTER JOIN address as a on a.id = l.address_id ");
    query.push(" LEFT OUTER JOIN image as i on i.id = l.image_id ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("lab list query = " + mySqlQuery.sql);
}

LabDao.prototype.getListForTest = function(data, cb){
    logger.debug("Lab get list for test method call start (getListForTest())"+data.test_ids);
    var count = 0;
    var tests = []
    if(data.test_ids){
        tests = data.test_ids.split(",");
        count = tests.length;
    }
    var query = [];
    query.push(" SELECT l.id, l.name ");
    query.push(" ,i.path as lab_image ");
    query.push(" ,a.address_line_1,a.address_line_2,a.landmark,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,sum(lt.price) as total_price ");
    query.push(" ,GROUP_CONCAT(t.id,'') as test_ids ");
    query.push(" ,GROUP_CONCAT(t.name,'') as test_name ");
    query.push(" ,GROUP_CONCAT(lt.price,'') as test_price ");
    query.push(" FROM easecare.lab_test as lt ");
    query.push(" inner join lab as l on l.id = lt.lab_id ");
    query.push(" inner join test AS t on t.id = lt.test_id ");
    query.push(" left join address as a on  l.address_id = a.id ");
    query.push(" left join image as i on l.image_id = i.id ");
    query.push(" where lt.test_id in(?) ");
    query.push(" group by lt.lab_id ");
    query.push(" having count(*) = ? ");
    query.push(" order by total_price ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[tests,count], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("lab list for test query = " + mySqlQuery.sql);
}

module.exports = LabDao;