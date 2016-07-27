/**
 * 
 */

module.exports = function(bean, data){
	
	bean.reqId = data.reqId;
	bean.user.userId = data.user.userId;
	bean.user.firmId = data.user.firmId;
	bean.user.search = data.user.search;
	
}
