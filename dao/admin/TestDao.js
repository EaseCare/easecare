"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var TestDao = function () { }

TestDao.prototype.getList = function (data, cb) {
    logger.debug("test get list method call start (getList())");
    var query = [];
    query.push(" SELECT t.id,t.name, ");
    query.push(" count(lab_id) as no_of_labs, ");
    query.push(" min(price) as minimum_price "); 
    query.push(" FROM test as t ");
    query.push(" inner join category as c on c.id = t.category_id ")
    query.push(" left outer join lab_test as lt on lt.test_id = t.id ");
    query.push(" left outer join lab as l on l.id = lt.lab_id ");
    if(data.category_id && data.category_id !== "0"){
        query.push(" where c.id =? and t.parent_id IS NULL ")
    }
    query.push(" group by t.id ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.category_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("test list query = " + mySqlQuery.sql);
}
TestDao.prototype.getSubList = function (data, cb) {
    logger.debug("test get list method call start (getList())");
    var query = [];
    query.push(" SELECT t.id,t.name, ");
    query.push(" count(lab_id) as no_of_labs, ");
    query.push(" min(price) as minimum_price "); 
    query.push(" FROM test as t ");
    query.push(" inner join category as c on c.id = t.category_id ")
    query.push(" left outer join lab_test as lt on lt.test_id = t.id ");
    query.push(" left outer join lab as l on l.id = lt.lab_id ");
    if(data.id){
        query.push(" where t.parent_id = ? ")
    }
    query.push(" group by t.id ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("sub test list query = " + mySqlQuery.sql);
}
TestDao.prototype.getDetail = function (data, cb) {
    logger.debug("test get detail method call start (getDetail()) ");
    var query = [];
    query.push(" SELECT t.id,t.name, ");
    query.push(" count(lab_id) as no_of_labs, ");
    query.push(" min(price) as minimum_price "); 
    query.push(" FROM test as t ");
    query.push(" inner join category as c on c.id = t.category_id ")
    query.push(" left outer join lab_test as lt on lt.test_id = t.id ");
    query.push(" left outer join lab as l on l.id = lt.lab_id ");
    if(data.id){
        query.push(" where t.id =? ")
    }
    query.push(" group by t.id ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("test detail query = " + mySqlQuery.sql);
}
        
        
TestDao.prototype.getTraceTest = function(data, cb){
    logger.debug();
    var statusOrTest = null;
    var query = [];
    query.push(" SELECT oi.id as order_id,oi.appointment_date as appointment_date,oi.status_id ");
    query.push(" ,ois.id as order_item_status_id,ois.name as order_item_status_name ");
    query.push(" ,oisc.created_date as order_item_status_change_date "); 
    query.push(" ,oa.address as order_address,oa.landmark as order_landmark "); 
    query.push(" ,oa.full_name as full_name,oa.mobile_number as mobile_number ");
    query.push(" ,t.id as test_id,t.name as test_name, lt.price as test_price ");
    query.push(" ,l.id as lab_id, l.name as lab_name ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" FROM `order` as o ");
    query.push(" inner join order_item as oi on oi.order_id = o.id ");
    query.push(" inner join order_item_status_change as oisc on oi.id = oisc.order_item_id ");
    query.push(" inner join order_item_status as ois on ois.id = oisc.status_id ");
    query.push(" inner join order_address as oa on oa.order_id = o.id ");
    query.push(" inner join test as t on t.id = oi.test_id ");
    query.push(" inner join lab as l on l.id = oi.lab_id ");
    query.push(" inner join lab_test as lt on l.id = lt.lab_id and t.id = lt.test_id ");
    query.push(" inner join address as a on a.id = l.address_id "); 
    query.push(" where o.user_id = ? "); 
    if(data.test_id){
        query.push(" and (t.id = ? ) ");
        statusOrTest = data.test_id;
    }else{
       if(data.status_id){
            query.push(" and (oi.status_id = ? ) ");
            statusOrTest = data.status_id;
        }else{
            query.push(" and (oi.status_id != 4 ) ");
        } 
    }
    
     query.push(" order by oi.id ");
    query = query.join(" ");

    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id,statusOrTest], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
    
}
TestDao.prototype.getTestLabs = function(data, cb){
    logger.debug("testlab get list method call start (getTestLabs())");
    logger.debug("lat long i got is"+data.latitude+"    "+data.longitude);
    
    var query = [];
    query.push(" SELECT l.id,l.name,lt.price,i.path as lab_image ");
    query.push(" ,t.id as test_id,t.name as test_name ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,SUM(ur.rating)/COUNT(ur.rating) as average_rating,ur.review,ur.created_date ");
    query.push(" ,u.id as user_id,u.first_name,u.last_name,u.image_id,iu.path as user_image ");
    if(data.latitude && data.longitude && data.latitude !== "0.0" && data.logitude !== "0.0"){
        query.push(" ,( 6371 * acos( cos( radians(?) ) "); 
        query.push(" * cos( radians( a.`latitude` ) ) "); 
        query.push(" * cos( radians( a.`longitude` ) - radians(?) ) "); 
        query.push(" + sin( radians(?) ) * sin( radians( a.`latitude` ) ) ) ) AS distance ");
    }
    query.push(" FROM test as t ");
    query.push(" LEFT JOIN lab_test as lt on lt.test_id = t.id ");
    query.push(" LEFT JOIN lab as l on l.id = lt.lab_id ");
    query.push(" LEFT JOIN address as a on a.id = l.address_id ");
    query.push(" LEFT JOIN user_rating as ur on ur.lab_id = l.id ");
    query.push(" LEFT JOIN image as i on i.id = l.image_id ");
    query.push(" LEFT JOIN user as u on u.id = ur.user_id ");
    query.push(" LEFT JOIN image as iu on iu.id = u.image_id ");

    if (data.id) {
        query.push(" where t.id = ? ");
    }
    query.push(" GROUP BY l.id ");
    var conditionArray = [];
    if(data.latitude && data.longitude && data.latitude !== "0.0" && data.logitude !== "0.0"){
        query.push(" HAVING distance <= 5 ");
        conditionArray.push(data.latitude);
        conditionArray.push(data.longitude);
        conditionArray.push(data.latitude);
        conditionArray.push(data.id);
    }else{
        conditionArray.push(data.id);
    }
    query = query.join(" ");


    var mySqlQuery = connection.query(query, conditionArray, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
         logger.debug("result set i got is"+JSON.stringify(resultSet));
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}
module.exports = TestDao;