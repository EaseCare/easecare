"use strict";

var moduleName = __filename;
var localCache = require('service/cache').local;
var config = require("config");
var message = config.messages;
var response = require('controller/ResponseController.js');
var logger = require("./Logger.js")(moduleName);

module.exports = {
    associateDBFirmConnectionWithReq : function(req, res, cb){
       	logger.info("Associate firm db connection with request (associateDBFirmConnectionWithReq())");

        var reqId = req.data.reqId;
        var cacheObject = localCache.get(reqId);
        var dbToPoolMap = localCache.get("dbToPoolMap");
        var firmId = req.data.user.firmId;
        var firmName = localCache.get(firmId);
        var poolCluster = localCache.get("poolCluster");
        var poolName = dbToPoolMap[firmName];
        logger.info("firmId : " + firmId);
        logger.info("firmName : " + firmName);
        
        if(!!poolName){
            poolCluster.getConnection(poolName, function (err, connection) {
                if(err) {
                    logger.error("Error in associating firm db connection with request (associateDBFirmConnectionWithReq()) " +err);
                    return cb(err, connection);
                }
                connection.changeUser({ database: firmName });
                cacheObject.connection = connection;
                logger.info("Associate firm db connection with request successful (associateDBFirmConnectionWithReq())");
                cb(null, connection);
            });
        }else{
            logger.error("No Pool found (associateDBFirmConnectionWithReq())");
            cb(message.noPoolFound);
        }
    },
    associateDBCommonConnectionWithReq : function(req, res, cb){
       	logger.info("Associate common db connection with request (associateDBCommonConnectionWithReq())");

        var reqId = req.data.reqId;
        var cacheObject = localCache.get(reqId);
        var poolCluster = localCache.get("poolCluster");
        logger.info("poolCluster: " + poolCluster);

        poolCluster.getConnection("common", function (err, connection) {
            if(err) {
                logger.error("Error in associating common db connection with request (associateDBCommonConnectionWithReq()) " + err);
                return cb(err, connection);
            }

            cacheObject.common = connection;
           	logger.info("Associate common db connection with request succesful (associateDBCommonConnectionWithReq())");
            cb(null, connection);
        });
    },
    startTransactionWithConnection : function(connection, cb){
       	logger.info("Start transaction (startTransactionWithConnection())");
        connection.beginTransaction(function(err){
            if(err){
                logger.error("Error in starting in transaction (startTransactionWithConnection())" + err);
                return cb(err);
            }
           	logger.info("Start transaction successful (startTransactionWithConnection())");
            cb();
        });
    },
    finishTransactionWithConnection : function(connection,status, cb){
       	logger.info("Finish transaction (finishTransactionWithConnection())");
    	var self = this;
        if(!status){
            connection.rollback(function(){
               	logger.info("Rollback transaction (finishTransactionWithConnection())");
                return cb();
            });
        }else{
            connection.commit(function(err){
                if(err){
                    logger.error("Error in committing transaction (finishTransactionWithConnection()) " + err);
                    return self.finishTransactionWithConnection(connection, false, function(){
                        return cb(err);
                    });
                }else{
                   	logger.info("Finished Transaction successful (finishTransactionWithConnection())");
                    cb();
                }
            });
        }
    }
};