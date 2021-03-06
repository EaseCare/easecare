/**
 * Base Class, all DAOs should inherit this
 */

var localCache = require('service/cache').local;

var BaseDao = function(){}

/**
 * 
 */
BaseDao.prototype.getConnection = function(data){
	return localCache.get(data.reqId).connection;	
}
/**
 * 
 */
BaseDao.prototype.getCommonDBConnection = function(data){
	return localCache.get(data.reqId).common;	
}

module.exports = new BaseDao();

/**
 * How to use
 *  var baseDao = require('dao/BaseDao.js'); 
 * 
 *  var firmConnection = baseDao.getConnection(data); //to get FirmSpecific connection
 *  var commonConnection = baseDao.getCommonDBConnection(data); // to get common DB connection
 */

