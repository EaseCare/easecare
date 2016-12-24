"use strict";

module.exports = {

    logout: 'You have been successfully logged out',
    orderPaymentSuccess: 'Order payment recieved successfully',
    cartRemove: 'User Cart removed successfully',
    cartItemRemove: 'Item removed from cart successfully',
    emptyCart : 'User cart is already empty',
    testPriceNotAvailable: 'Test price for this lab not available in system',
    usedCoupon: 'Coupon Code is already used',
    invalidCoupon: 'Coupon Code is not valid',
    orderItemNotFound: 'Order Item not found in application',
    orderItemNotFoundInCart:'Order Item not found in shopping cart',
    offerNotFound: 'Offer is invalid and not found in system',
    orderPriceNotFound: 'Order price not found in system',
    offerAlreadyApplied: 'Offer already used by user',
    prescriptionNotFound:'Prescription Id not found',
    prescriptionDeleted:'Prescription deleted successfully',
    jsonParserError: 'Invalid Json response, please verify data',
    redisDeleteError: 'Error occured in redis Delete operation',
    redisPutError: 'Error occured in redis Put operation',
    redisGetError: 'Error occured in redis Get operation',
    notLoggedIn: 'You are not logged in anymore',
    invalidHeaders: 'Invalid Authorization Header',
    invalidToken: 'Invalid Token',
    Unauthorized: 'Unauthorized: Access is denied due to invalid credentials',
    accessDenied: 'Access Denied',
    notFound: 'Not Found',
    badRequest:'Bad Request: Verify request data',
    internalServerError: 'Your request cannot be processed at the moment, please verify parameters',
    wrongCredentials:'Wrong Credentials',
    
    //Role Messages
    roleAdded: 'Role created successfully',
    roleUpdated: 'Role updated successfully',
    roleDeleted: 'Role deleted successfully',
    roleNotFoud: 'Role does not exist',
    roleNotFound: 'Role does not exist',
    roleAssigned: 'Role assigned successfully',
    roleAssignedUpdated: 'Role assigned updated successfully',
    roleNotFoudOrDeleted: 'Role does not exist or already deleted',
    roleReassigned: 'Role reassigned successfully',
    roleAlreadyExist: 'Role already exist with same name',
    roleTypeNotFound: 'Role Type does not exist',
    userAssociated: 'Role has user associated with it',
    noUserAssociatedWithRole:'No user associated with role',

    //Privileges Messages
    privilegesAdded: 'Privileges added successfully',
    missingParameters: 'Missing required parameters',
    privilegeNotFoud: 'Privilege does not exist',
    interServerError: 'Your request cannot be processed at the moment',
    //Preferences messages
    preferencesDataNotFound: 'Unable to find records',
    preferencesInvalidHeader: 'Invalid or wrong query parameters',
    preferencesInvalidList: 'Invalid or wrong list passed',
    invalidPreferencePrivileg: 'User does not has privileges.',
    //firm messages
    firmNotFound: 'Firm does not exist',
    firmAssigned: 'Firm assigned successfully',

    //team messages
    teamNotFound: 'Team does not exist',
    teamNotFoudOrDeleted: 'Team does not exist or already deleted',
    teamDeleted: 'Team deleted successfully',
    teamAssigned: 'Team assigned successfully',
    teamAlreadyExist: 'Team already exist with same name',
    userAssignToTeam: 'User assigned to team successfully',
    portfolioAssignToTeam: 'Portfolio assigned to team successfully',
    advisorAssignToTeam: 'Advisor assigned to team successfully',
    modelAssignToTeam: 'Model assigned to team successfully',
    accountAssignToTeam: 'Account assigned to team successfully',
    teamUserAssociated: 'Team has user associated with it',
    accountUnAssignFromTeam:'Account unassociated from team successfully',
    modelUnAssignFromTeam:'Model unassociated from team successfully',
    advisorUnAssignFromTeam:'Advisor unassociated from team successfully',
    portfolioUnAssignFromTeam:'Portfolio unassociated from team successfully',
    userUnAssignFromTeam:'User unassociated from team successfully',
    advisorAssignToTeamUpdate: 'Advisor assigned to team updated successfully',
    userAssignToTeamUpdate: 'User assigned to team updated successfully',
    modelAssignToTeamUpdate: 'Model assigned to team updated successfully',
    portfolioAssignToTeamUpdate: 'Portfolio assigned to team updated successfully',
    teamReassigned: 'Team reassigned successfully',
    noUserAssociatedWithTeam: 'No user associated with team',
    oldAndNewSameId: 'oldId and newId can not be same',
    //user messages
    userNotFound: 'User does not exist',
    userNotFoudOrDeleted: 'User does not exist or already deleted',
    userFirmNotFound: 'Could not find Current User Firm',
    NoPrivilegeAssociated: 'No Privilege Associate with User',
    userDeleted: 'User deleted successfully',
    userPrivilegeNotFound: 'No privilege exist for user',
    userAlreadyExist: 'User already exist with same id',
    noPoolFound: 'No Pool for Database',
    //Custodian messages
    custodianNotFound: 'Custodian does not exist',
    custodianAlreadyExist: 'Custodian already exist with same id',
    duplicateTradeExecution: 'You can not send both tradeExecutionTypeId and tradeExecutions parameter',
    //Subclass messages
    subClassNameExists : ' SubClass name already exists or you cannot edit this subClass',

    // class messages
    classNameExists : ' Class name already exists or you cannot edit this class',
    
    // Category messages
    categoryNameExists : ' Category name already exists or you cannot edit this category'
};

